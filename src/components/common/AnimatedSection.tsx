"use client"

import { motion, type Variants } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/motion"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  stagger?: boolean
  delay?: number
}

export function AnimatedSection({
  children,
  className,
  variants = fadeInUp,
  stagger = false,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger ? staggerContainer : { ...variants, visible: { ...((variants.visible as object) ?? {}), transition: { ...(((variants.visible as { transition?: object })?.transition) ?? {}), delay } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedItem({
  children,
  className,
  variants = fadeInUp,
}: {
  children: React.ReactNode
  className?: string
  variants?: Variants
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
