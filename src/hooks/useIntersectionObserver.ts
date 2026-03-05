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
    /**
     * True when the element was already in the viewport the moment the observer
     * was first attached (i.e. it was visible on page load without any user
     * scroll). Consumers can use this to skip entrance animations for content
     * that Safari / iOS 26 already rendered below the fold before the JS runs.
     */
    const [skipAnimation, setSkipAnimation] = useState(false);

    useEffect(() => {
        const currentRef = ref.current;

        // ── iOS 26 / Safari bottom-bar fix ──────────────────────────────────
        // Safari on iOS 26 shows content behind the tab bar so elements that
        // are "off-screen" in traditional terms are already visible to the user.
        // If the element is inside the rendered viewport on mount, mark it as
        // already visible so consumers can skip the entrance animation.
        if (currentRef) {
            const rect = currentRef.getBoundingClientRect();
            const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
            if (alreadyInView) {
                setIsVisible(true);
                setSkipAnimation(true);
                // When once=true we don't need to observe further – the element
                // will stay visible and won't need to animate on a future scroll.
                if (once) return;
            }
        }
        // ────────────────────────────────────────────────────────────────────

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Scroll-triggered visibility – animation should play normally.
                    setSkipAnimation(false);
                    setIsVisible(true);
                    // Disconnect after first intersection if 'once' is true
                    if (once && currentRef) {
                        observer.unobserve(currentRef);
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

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [rootMargin, threshold, once]);

    return { ref, isVisible, skipAnimation };
}
