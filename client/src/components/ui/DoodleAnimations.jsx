import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FloatingDoodles = () => {
  const { scrollYProgress } = useScroll();
  
  // Create different parallax speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 3D/4D Floating Cube Doodle */}
      <motion.svg 
        style={{ y: y1, rotate: rotate1 }} 
        className="absolute top-[20%] left-[5%] w-32 h-32 text-purple-500/20"
        viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <path d="M20,30 L80,30 L80,90 L20,90 Z" />
        <path d="M40,10 L100,10 L100,70 L40,70 Z" />
        <path d="M20,30 L40,10 M80,30 L100,10 M80,90 L100,70 M20,90 L40,70" />
      </motion.svg>

      {/* Abstract Swirl Doodle */}
      <motion.svg 
        style={{ y: y2, rotate: rotate2 }} 
        className="absolute top-[40%] right-[10%] w-48 h-48 text-cyan-500/20"
        viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      >
        <path d="M 10 100 C 10 200, 190 200, 190 100 C 190 50, 150 10, 100 10 C 50 10, 30 50, 30 100 C 30 130, 60 160, 100 160 C 130 160, 150 130, 150 100" />
        <circle cx="100" cy="100" r="10" fill="currentColor" />
      </motion.svg>

      {/* Geometry Doodle */}
      <motion.svg 
        style={{ y: y3, rotate: rotate1 }} 
        className="absolute top-[70%] left-[15%] w-40 h-40 text-pink-500/20"
        viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <polygon points="50,10 90,90 10,90" />
        <circle cx="50" cy="63" r="27" />
        <line x1="50" y1="10" x2="50" y2="90" />
      </motion.svg>
      
      {/* Hand-drawn Star */}
      <motion.svg 
        style={{ y: y1, rotate: rotate2 }} 
        className="absolute top-[80%] right-[20%] w-24 h-24 text-yellow-500/20"
        viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"
      >
        <path d="M 50 10 L 60 40 L 90 40 L 65 60 L 75 90 L 50 70 L 25 90 L 35 60 L 10 40 L 40 40 Z" />
      </motion.svg>
    </div>
  );
};

export const ParallaxSection = ({ children, speed = 1, className = "" }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed]);
  
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export const Mouse3DWrapper = ({ children, className = "" }) => {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate max 10 degrees
    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};
