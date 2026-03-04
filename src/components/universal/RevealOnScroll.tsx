/**
 * RevealOnScroll Wrapper Component
 * 
 * Wraps animated content and only applies animation classes when scrolled into view.
 * Works seamlessly with existing animation classes like fadeSlideUpFromBottom, 
 * scrapbookLetterAppear, mascotAppear, etc.
 * 
 * @example
 * <RevealOnScroll>
 *   <h1 className="fadeSlideUpFromBottom">Heading</h1>
 * </RevealOnScroll>
 */

import React, { type ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface RevealOnScrollProps {
  /**
   * The content to reveal on scroll
   */
  children: ReactNode;
  
  /**
   * CSS class(es) to apply when element is visible
   * Can include animation classes like 'fadeSlideUpFromBottom'
   */
  visibleClassName?: string;
  
  /**
   * CSS class to apply when element is not visible (for paused state)
   */
  hiddenClassName?: string;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * How close to viewport edge should animation trigger (default: '0px')
   * Examples: '100px' triggers 100px before entering, '-50px' triggers 50px after entering
   */
  rootMargin?: string;
  
  /**
   * Visibility threshold (0-1, default: 0.1)
   * 0 = any part visible, 1 = entire element visible
   */
  threshold?: number | number[];
  
  /**
   * If true, animation plays only once on first scroll into view (default: true)
   */
  once?: boolean;
  
  /**
   * Wrapper element type (default: 'div')
   */
  as?: React.ElementType;
}

/**
 * RevealOnScroll Component
 * Utility wrapper for scroll-reveal animations
 */
export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  visibleClassName = '',
  hiddenClassName = '',
  className = '',
  rootMargin = '0px',
  threshold = 0.1,
  once = true,
  as: Component = 'div',
}) => {
  const { ref, isVisible } = useIntersectionObserver({
    rootMargin,
    threshold,
    once,
  });

  const animationClass = isVisible ? visibleClassName : hiddenClassName;
  const combinedClassName = `${className} ${animationClass}`.trim();

  // Pre-set the element to its animation start state before it enters view.
  // This prevents the "show → flash invisible → animate in" bug on mobile,
  // which happens because the CSS animation `from` keyframe (opacity:0) briefly
  // overrides the element's natural opacity:1 when the class is first applied.
  const preAnimationStyle =
    !isVisible && visibleClassName
      ? { opacity: 0 as const, transform: 'translateY(20px)' }
      : undefined;

  return (
    <Component ref={ref} className={combinedClassName} style={preAnimationStyle}>
      {children}
    </Component>
  );
};

export default RevealOnScroll;
