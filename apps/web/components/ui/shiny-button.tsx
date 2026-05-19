"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as any;

interface ShinyButtonProps extends HTMLMotionProps<"a"> {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({ children, className, href, ...props }) => {
  return (
    <motion.a
      href={href}
      {...animationProps}
      {...props}
      className={cn(
        "relative rounded-full px-8 py-4 font-semibold transition-shadow duration-300 ease-in-out hover:shadow",
        "flex items-center justify-center text-center",
        className
      )}
      style={{
        backgroundColor: "var(--cr-navy-900)", // Couleur sombre de marque
        color: "white",
        textDecoration: "none",
        ...props.style,
      }}
    >
      <span
        className="relative flex items-center justify-center gap-2 size-full text-[15px] tracking-wide text-white"
        style={{
          maskImage:
            "linear-gradient(-75deg, black calc(var(--x) + 20%), transparent calc(var(--x) + 30%), black calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg, black calc(var(--x) + 20%), transparent calc(var(--x) + 30%), black calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,transparent_calc(var(--x)+20%),rgba(255,255,255,0.7)_calc(var(--x)+25%),transparent_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.a>
  );
};
