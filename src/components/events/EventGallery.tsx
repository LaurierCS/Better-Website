/**
 * EventGallery Component
 * Wrapper around ImageGallery that syncs with event data
 * Notifies parent when the active event changes
 */

import { useState, useEffect } from 'react';
import type { EventData } from '../../data/eventsData';

// Accent colors matching the site
const accentColors = ['#FF9FC4', '#FF9770', '#FFD670', '#268AF9', '#B1E0FF'];

interface EventGalleryProps {
  events: EventData[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  autoScrollInterval?: number;
}

export default function EventGallery({
  events,
  currentIndex,
  onIndexChange,
  autoScrollInterval = 0,
}: EventGalleryProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onIndexChange((currentIndex - 1 + events.length) % events.length);
      } else if (e.key === 'ArrowRight') {
        onIndexChange((currentIndex + 1) % events.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, events.length, onIndexChange]);

  // Auto-scroll (paused on hover)
  useEffect(() => {
    if (autoScrollInterval <= 0 || events.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      onIndexChange((currentIndex + 1) % events.length);
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, [autoScrollInterval, events.length, currentIndex, onIndexChange, isHovered]);

  if (!events || events.length === 0) {
    return <div className="text-white/60 text-center py-8">No events to display</div>;
  }

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full bg-slate-800/50 rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/11' }}>
        {events.map((event, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + events.length) % events.length;

          let transform = 'translateX(100%) scale(0.9)';
          let opacity = 0;

          if (isActive) {
            transform = 'translateX(0) scale(1)';
            opacity = 1;
          } else if (isPrev) {
            transform = 'translateX(-100%) scale(0.9)';
            opacity = 0;
          }

          return (
            <img
              key={event.id}
              src={event.image}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
              style={{ transform, opacity, zIndex: isActive ? 10 : 0 }}
            />
          );
        })}

        {/* Date Badge Overlay */}
        <div
          className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-3 text-center z-20"
          style={{ borderLeft: `3px solid ${accentColors[currentIndex % accentColors.length]}` }}
        >
          <div className="text-xs sm:text-sm font-bold text-white/80 uppercase tracking-wider">
            {new Date(events[currentIndex].date).toLocaleDateString('en-US', { month: 'short' })}
          </div>
          <div className="text-lg sm:text-xl font-bold text-white">
            {new Date(events[currentIndex].date).getDate()}
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold z-20">
          {currentIndex + 1} / {events.length}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex ? 'w-8' : 'w-3 hover:w-4'
            }`}
            style={{
              height: '12px',
              backgroundColor: index === currentIndex 
                ? accentColors[index % accentColors.length]
                : '#ffffff',
            }}
            aria-label={`Go to event ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
