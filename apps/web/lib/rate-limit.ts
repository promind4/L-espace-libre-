/**
 * Rate-limiting en mémoire — v1.
 *
 * Cible : 10 requêtes par IP par heure sur /api/simulator.
 *
 * Limitation connue : la mémoire est locale à une instance de Vercel
 * Function. En cas de scale-out (plusieurs instances concurrentes),
 * la limite réelle peut être franchie temporairement. Pour la v1 cela
 * est acceptable (volume attendu modeste). Migration v2 vers Upstash
 * Redis ou Vercel KV si nécessaire.
 */

interface Bucket {
  hits: number[];
}

const WINDOW_MS = 60 * 60 * 1000; // 1 heure
const MAX_HITS = 10;

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  limited: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function checkRateLimit(
  key: string,
  now: number = Date.now(),
): RateLimitResult {
  const bucket = buckets.get(key) ?? { hits: [] };
  // Fenêtre glissante : on supprime les hits hors de la dernière heure.
  bucket.hits = bucket.hits.filter((t) => now - t < WINDOW_MS);

  if (bucket.hits.length >= MAX_HITS) {
    const oldest = bucket.hits[0] ?? now;
    const retryAfterMs = WINDOW_MS - (now - oldest);
    return {
      limited: true,
      remaining: 0,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  return {
    limited: false,
    remaining: MAX_HITS - bucket.hits.length,
    retryAfterSeconds: 0,
  };
}

/** Réinitialise le rate-limiter — utile dans les tests. */
export function resetRateLimit(): void {
  buckets.clear();
}

/** Récupère une IP exploitable depuis un objet Request. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
