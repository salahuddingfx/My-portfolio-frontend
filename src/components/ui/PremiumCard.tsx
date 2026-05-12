"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

interface PremiumCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "glass" | "accent";
}

const PremiumCard = ({
  children,
  className,
  delay = 0,
  variant = "default",
  ...props
}: PremiumCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "premium-card p-6 md:p-8",
        variant === "glass" && "glass-morphism",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PremiumCard;
