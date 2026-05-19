/**
 * Icône — wrapper unifié sur lucide-react.
 * Conforme à la directive : outline only, 1.5 px stroke, 24×24 par défaut.
 */
import {
  Home,
  Building2,
  Archive,
  ScrollText,
  Sparkles,
  ShieldCheck,
  Recycle,
  Zap,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  Phone,
  Menu,
  Mail,
  Calculator,
  Instagram,
  Linkedin,
  Facebook,
  Users,
  Truck,
  Package,
  Star,
  Quote,
  Camera,
  HardHat,
  CheckCircle2,
  type LucideProps,
} from "lucide-react";

const REGISTRY = {
  home: Home,
  building: Building2,
  "building-2": Building2,
  archive: Archive,
  "scroll-text": ScrollText,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
  recycle: Recycle,
  zap: Zap,
  "map-pin": MapPin,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "arrow-up": ArrowUp,
  "chevron-down": ChevronDown,
  phone: Phone,
  menu: Menu,
  mail: Mail,
  calculator: Calculator,
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  users: Users,
  truck: Truck,
  package: Package,
  star: Star,
  quote: Quote,
  camera: Camera,
  "hard-hat": HardHat,
  "check-circle": CheckCircle2,
} as const;

export type IconName = keyof typeof REGISTRY;

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

export function Icon({ name, size = 24, strokeWidth = 1.5, ...rest }: IconProps) {
  const Component = REGISTRY[name];
  if (!Component) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[Icon] icône inconnue: "${name}" — ajouter au REGISTRY de components/ui/Icon.tsx`);
    }
    return null;
  }
  return <Component size={size} strokeWidth={strokeWidth} aria-hidden {...rest} />;
}
