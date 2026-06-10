"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -80,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.0,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
            style={{ pointerEvents: 'none' }}
        >
            <motion.div
                animate={{
                    y: [0, 12, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border border-white/[0.12]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.3 + i * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div 
            className="hero-geometric-wrapper"
            style={{ 
                position: 'relative', 
                width: '100%', 
                minHeight: '340px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                overflow: 'hidden', 
                background: 'transparent',
                textAlign: 'center',
                paddingTop: '20px',
                paddingBottom: '20px'
            }}
        >
            {/* Blurry gradient mesh background */}
            <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                    background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.04) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    zIndex: 0
                }}
            />

            {/* Floating elegant geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                <ElegantShape
                    delay={0.2}
                    width={450}
                    height={100}
                    rotate={12}
                    gradient="from-indigo-500/[0.10]"
                    className="left-[-15%] top-[10%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={350}
                    height={80}
                    rotate={-15}
                    gradient="from-rose-500/[0.10]"
                    className="right-[-10%] top-[50%]"
                />

                <ElegantShape
                    delay={0.3}
                    width={220}
                    height={60}
                    rotate={-8}
                    gradient="from-violet-500/[0.10]"
                    className="left-[5%] bottom-[5%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={150}
                    height={40}
                    rotate={20}
                    gradient="from-cyan-500/[0.10]"
                    className="right-[10%] top-[5%]"
                />
            </div>

            {/* Centered Main Hero Text Block */}
            <div className="relative z-10" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    
                    {/* Badge */}
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="hero-badge"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '6px 16px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            marginBottom: '24px'
                        }}
                    >
                        <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', trackingWide: '0.05em', fontWeight: '500' }}>
                            {badge}
                        </span>
                    </motion.div>

                    {/* Titles */}
                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ width: '100%' }}
                    >
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                            <span style={{ background: 'linear-gradient(to bottom, #ffffff, #e2e8f0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {title1}
                            </span>
                            <br />
                            <span style={{ background: 'linear-gradient(to right, #a5b4fc, #ffffff, #fca5a5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subtitle paragraph */}
                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: '1.6', fontWeight: '300', margin: '0 auto', maxWidth: '460px' }}>
                            Crafting exceptional digital experiences through innovative design and cutting-edge technology.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export { HeroGeometric }
