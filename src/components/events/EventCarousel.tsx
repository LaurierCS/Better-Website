import { useState, useEffect, useRef } from 'react';
import { EventCarouselItem } from './EventCarouselItem';

interface CarouselEvent {
  id: string;
  image: string;
  title: string;
  date: string;
  description: string;
}

interface EventCarouselProps {
  events: CarouselEvent[];
}

export const EventCarousel = ({ events }: EventCarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const speedMultiplierRef = useRef(1);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartTranslateRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const lastMouseXRef = useRef(0);
  const lastTimeVelocityRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate events array to create seamless infinite loop
  const duplicatedEvents = [...events, ...events];

  // Initialize timing refs in useEffect to avoid impure function calls during render
  useEffect(() => {
    lastTimeRef.current = Date.now();
    lastTimeVelocityRef.current = Date.now();
  }, []);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update ref when speedMultiplier changes
  useEffect(() => {
    speedMultiplierRef.current = speedMultiplier;
  }, [speedMultiplier]);

  // Handle deceleration on hover and acceleration on unhover (desktop only)
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeedMultiplier((prev) => {
        if ((isHovered || isDragging) && !isMobile) {
          return Math.max(0, prev - 0.2);
        } else if (isMobile) {
          return 1; // Keep full speed on mobile
        } else {
          return Math.min(1, prev + 0.2);
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isHovered, isDragging, isMobile]);

  // Handle mouse down - start drag (disabled on mobile)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable dragging on mobile
    if (isMobile) return;
    
    // Only allow dragging when carousel is stopped (speedMultiplier is 0)
    if (speedMultiplierRef.current > 0.05) return;
    
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartTranslateRef.current = translateX;
    lastMouseXRef.current = e.clientX;
    lastTimeVelocityRef.current = Date.now();
    dragVelocityRef.current = 0;
  };

  // Global mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const currentX = e.clientX;
      const dragDelta = currentX - dragStartXRef.current;
      
      // Convert pixel movement to percentage based on container width
      const containerWidth = containerRef.current?.offsetWidth || 1000;
      const deltaPercent = (dragDelta / containerWidth) * 15; // Reduced to 15 for much slower, more controlled drag
      
      // Calculate velocity
      const now = Date.now();
      const timeDelta = now - lastTimeVelocityRef.current;
      if (timeDelta > 0) {
        dragVelocityRef.current = (currentX - lastMouseXRef.current) / timeDelta;
      }
      
      lastMouseXRef.current = currentX;
      lastTimeVelocityRef.current = now;

      // Update position
      setTranslateX(dragStartTranslateRef.current + deltaPercent);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      setTranslateX((prev) => {
        let newPos = prev;

        if (!isDragging) {
          // Apply momentum/velocity - increased multiplier for stronger throws
          if (Math.abs(dragVelocityRef.current) > 0.1) {
            const velocityPercent = dragVelocityRef.current * 0.15; // Increased from 0.05 for more throw momentum
            newPos += velocityPercent;
            dragVelocityRef.current *= 0.91; // Slightly reduced friction for longer momentum
          }

          // Apply auto-scroll
          const pixelsPerSecond = (50 / 40) * speedMultiplierRef.current;
          newPos -= pixelsPerSecond * deltaTime;
        }

        // Seamless infinite loop - reset at -50%
        if (newPos <= -50) {
          return newPos + 50;
        }
        if (newPos > 0) {
          return newPos - 50;
        }

        return newPos;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-hidden md:cursor-grab md:active:cursor-grabbing select-none"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
      }}
    >
      <div
        className="flex gap-6"
        style={{
          transform: `translateX(${translateX}%)`,
          width: 'fit-content',
          userSelect: 'none',
        }}
        onMouseEnter={() => !isDragging && !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isDragging && !isMobile && setIsHovered(false)}
        onMouseDown={!isMobile ? handleMouseDown : undefined}
      >
        {duplicatedEvents.map((event, index) => (
          <div key={`${event.id}-${index}`}>
            <EventCarouselItem
              image={event.image}
              title={event.title}
              date={event.date}
              description={event.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
