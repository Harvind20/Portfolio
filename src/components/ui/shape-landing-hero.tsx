"use client";

import React from "react";
import { motion } from "framer-motion";

function ElegantShape({
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "rgba(255, 255, 255, 0.08)",
    style = {},
}: {
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    style?: React.CSSProperties;
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
            style={{
                position: 'absolute',
                pointerEvents: 'none',
                ...style
            }}
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
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '9999px',
                        background: `linear-gradient(to right, ${gradient}, transparent)`,
                        backdropFilter: 'blur(2px)',
                        WebkitBackdropFilter: 'blur(2px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.05)',
                    }}
                />
                <div 
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '9999px',
                        background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 70%)',
                        pointerEvents: 'none'
                    }}
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
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    pointerEvents: 'none',
                    background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.04) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    zIndex: 0
                }}
            />

            {/* Floating elegant geometric shapes */}
            <div 
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    bottom: 0, 
                    left: 0, 
                    overflow: 'hidden', 
                    pointerEvents: 'none',
                    zIndex: 0 
                }}
            >
                <ElegantShape
                    delay={0.2}
                    width={450}
                    height={100}
                    rotate={12}
                    gradient="rgba(99, 102, 241, 0.1)"
                    style={{ left: '-15%', top: '10%' }}
                />

                <ElegantShape
                    delay={0.4}
                    width={350}
                    height={80}
                    rotate={-15}
                    gradient="rgba(244, 63, 94, 0.1)"
                    style={{ right: '-10%', top: '50%' }}
                />

                <ElegantShape
                    delay={0.3}
                    width={220}
                    height={60}
                    rotate={-8}
                    gradient="rgba(139, 92, 246, 0.1)"
                    style={{ left: '5%', bottom: '5%' }}
                />

                <ElegantShape
                    delay={0.5}
                    width={150}
                    height={40}
                    rotate={20}
                    gradient="rgba(6, 182, 212, 0.1)"
                    style={{ right: '10%', top: '5%' }}
                />
            </div>

            {/* Centered Main Hero Text Block */}
            <div className="relative z-10" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    
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
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '16px', letterSpacing: '-0.02em', textAlign: 'center' }}>
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
                        <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: '1.6', fontWeight: '300', margin: '0 auto', maxWidth: '460px', textAlign: 'center' }}>
                            Crafting exceptional digital experiences through innovative design and cutting-edge technology.
                        </p>
                    </motion.div>

                    {/* Internship Status Badge */}
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(59, 130, 246, 0.08)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            marginTop: '20px'
                        }}
                    >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
                        <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.95)', fontWeight: '600', letterSpacing: '0.02em' }}>
                            Seeking Internship: July 27th – October 18th
                        </span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export { HeroGeometric }
