"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, createContext, useContext } from "react";
import {
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";

const ImageComparisonContext = createContext<
  | {
      sliderPosition: number;
      setSliderPosition: (pos: number) => void;
      motionSliderPosition: MotionValue<number>;
    }
  | undefined
>(undefined);

export type ImageComparisonProps = {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
};

const DEFAULT_SPRING_OPTIONS = {
  bounce: 0,
  duration: 0
};

function ImageComparison({
  children,
  className,
  enableHover,
  springOptions
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(motionValue, springOptions ?? DEFAULT_SPRING_OPTIONS);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !enableHover) return;

    const containerRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    let clientX = 0;
    if ("touches" in event) {
      if (event.touches.length > 0) {
        clientX = event.touches[0]!.clientX;
      } else {
        return;
      }
    } else {
      clientX = (event as React.MouseEvent).clientX;
    }

    const x = clientX - containerRect.left;

    const percentage = Math.min(Math.max((x / containerRect.width) * 100, 0), 100);
    motionValue.set(percentage);
    setSliderPosition(percentage);
  };

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}>
      <div
        className={cn(className)}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          userSelect: "none",
          cursor: enableHover ? "ew-resize" : "auto",
        }}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}>
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

const ImageComparisonImage = ({
  className,
  alt,
  src,
  position
}: {
  className?: string;
  alt: string;
  src: string;
  position: "left" | "right";
}) => {
  const { motionSliderPosition } = useContext(ImageComparisonContext)!;
  const leftClipPath = useTransform(motionSliderPosition, (value) => `inset(0 0 0 ${value}%)`);
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`
  );

  return (
    <motion.div
      className={cn(className)}
      style={{
        position: "absolute",
        inset: 0,
        height: "100%",
        width: "100%",
        clipPath: position === "left" ? leftClipPath : rightClipPath
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 880px) 100vw, 1200px"
      />
    </motion.div>
  );
};

const ImageComparisonSlider = ({
  className,
  children,
  style
}: {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const { motionSliderPosition } = useContext(ImageComparisonContext)!;

  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      className={cn(className)}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "4px",
        cursor: "ew-resize",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left,
        transform: "translateX(-50%)",
        ...style
      }}>
      {children}
    </motion.div>
  );
};

export { ImageComparison, ImageComparisonImage, ImageComparisonSlider };
