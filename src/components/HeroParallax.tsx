import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'motion/react';

export interface HeroParallaxProduct {
  title: string;
  link: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: HeroParallaxProduct[];
  header?: React.ReactNode;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({
  products,
  header,
}) => {
  // Split products across 3 distinct parallax rows for maximum depth and smooth horizontal translation
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Horizontal parallax motion values
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );

  // 3D perspective transforms responding to scroll
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 300]),
    springConfig
  );

  return (
    <div
      ref={containerRef}
      className="h-[280vh] sm:h-[300vh] py-16 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {header}

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="will-change-transform"
      >
        {/* ROW 1: Moves right as user scrolls down */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 sm:space-x-12 mb-10 sm:mb-16">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>

        {/* ROW 2: Moves left as user scrolls down */}
        <motion.div className="flex flex-row space-x-8 sm:space-x-12 mb-10 sm:mb-16">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>

        {/* ROW 3: Moves right as user scrolls down */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 sm:space-x-12">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

interface ProductCardProps {
  product: HeroParallaxProduct;
  translate: MotionValue<number>;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  translate,
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -15,
      }}
      key={product.title}
      className="group/product h-64 sm:h-72 md:h-80 w-[24rem] sm:w-[28rem] md:w-[32rem] relative shrink-0 rounded-2xl overflow-hidden border border-[#c4c7c7]/60 bg-white shadow-sm hover:shadow-[0_20px_50px_rgba(185,232,106,0.3)] hover:border-[#b9e86a] transition-shadow duration-300"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl h-full w-full relative"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="800"
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-700 ease-out group-hover/product:scale-105"
          alt={product.title}
          loading="lazy"
        />
        {/* Subtle dark gradient overlay to ensure contrast and clean edges */}
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-60 bg-black/70 transition-opacity duration-300 pointer-events-none" />
        <h2 className="absolute bottom-5 left-5 opacity-0 group-hover/product:opacity-100 text-white font-display-tech font-extrabold text-lg sm:text-xl tracking-tight transition-opacity duration-300 pointer-events-none drop-shadow-md">
          {product.title}
        </h2>
      </a>
    </motion.div>
  );
};

export default HeroParallax;
