import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
    /**
     * Margin around the target element to trigger the callback (default: '0px')
     * Example: '100px' would trigger when element is 100px away from viewport edge
     */
    rootMargin?: string;
    /**
     * Threshold of visibility required to trigger (0-1, default: 0.1)
     * 0 = any part visible, 1 = entire element visible
     */
    threshold?: number | number[];
    /**
     * If true, observer will disconnect after first intersection (default: false)
     * Useful if you only want animation to play once on scroll into view
     */
    once?: boolean;
}

/**
 * Custom hook to detect when an element enters the viewport
 * Perfect for scroll-reveal animations and lazy loading
 * 
 * @example
 * const { ref, isVisible } = useIntersectionObserver();
 * return (
 *   <div ref={ref} className={isVisible ? 'fadeSlideUpFromBottom' : ''}>
 *     Content here
 *   </div>
 * );
 */
export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
    const { rootMargin = '0px', threshold = 0.1, once = false } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Disconnect after first intersection if 'once' is true
                    if (once && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else if (!once) {
                    // If not in 'once' mode, allow animation to replay when scrolling back
                    setIsVisible(false);
                }
            },
            {
                rootMargin,
                threshold,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [rootMargin, threshold, once]);

    return { ref, isVisible };
}
