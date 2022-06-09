import React from 'react';
import { motion } from 'framer-motion';

function TextAnimation({ text }) {
  const text2arr = Array.from(text);
  const banner = {
    animate: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.05,
        staggerDirection: 1,
        duration: 1,
      },
    },
  };
  const letterAnimation = {
    initial: {
      y: 40,
    },
    animate: {
      y: 0,
      transitions: {
        ease: [0.6, 0.01, -0.05, 0.9],
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      className="w-fit mx-auto text-center"
      initial="initial"
      whileInView="animate"
      variants={banner}
    >
      <div className="overflow-hidden">
        {text2arr.map((word, index) => (
          <motion.span
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="inline-block"
            variants={letterAnimation}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
export default TextAnimation;
