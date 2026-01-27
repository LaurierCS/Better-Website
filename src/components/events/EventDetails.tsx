/**
 * EventDetails Component
 * Displays event information (title, description, date, time, location)
 * Animates when switching between events
 */

import { useEffect, useState, useRef } from 'react';
import type { EventData } from '../../data/eventsData';
import '../styles/eventTransitions.css';

// Accent colors matching the site palette
const accentColors = ['#FF9FC4', '#FF9770', '#FFD670', '#268AF9', '#B1E0FF'];

interface EventDetailsProps {
  event: EventData;
  eventIndex: number;
}

export default function EventDetails({ event, eventIndex }: EventDetailsProps) {
  const [displayEvent, setDisplayEvent] = useState(event);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accentColor = accentColors[eventIndex % accentColors.length];

  // Handle smooth transition when event changes
  useEffect(() => {
    if (event.id !== displayEvent.id) {
      // Clear any pending transition
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      // Start fade out
      transitionTimerRef.current = setTimeout(() => {
        setIsTransitioning(true);
        
        // Update content after fade out
        transitionTimerRef.current = setTimeout(() => {
          setDisplayEvent(event);
          setIsTransitioning(false);
        }, 300);
      }, 0);
    }

    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [event.id, displayEvent.id, event]);

  return (
    <div
      className={`w-full transition-opacity duration-300 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ fontFamily: 'Dosis, sans-serif' }}
    >
      {/* Event Title */}
      <h3
        className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-5 event-detail-item accent-transition"
        style={{ color: accentColor }}
      >
        {displayEvent.title.toUpperCase()}
      </h3>

      {/* Event Description */}
      <p className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-8 event-detail-item">
        {displayEvent.description}
      </p>

      {/* Event Meta Info */}
      <div className="space-y-4">
        {/* Date */}
        <div className="flex items-center gap-4 event-detail-item">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center accent-transition"
            style={{ backgroundColor: accentColor + '20', border: `1px solid ${accentColor}40` }}
          >
            <svg className="w-6 h-6" fill="currentColor" style={{ color: accentColor }} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1h2z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-white text-base sm:text-lg md:text-xl font-medium">
            {displayEvent.date}
          </span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-4 event-detail-item">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center accent-transition"
            style={{ backgroundColor: accentColor + '20', border: `1px solid ${accentColor}40` }}
          >
            <svg className="w-6 h-6" fill="currentColor" style={{ color: accentColor }} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-white text-base sm:text-lg md:text-xl font-medium">
            {displayEvent.time}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4 event-detail-item">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center accent-transition"
            style={{ backgroundColor: accentColor + '20', border: `1px solid ${accentColor}40` }}
          >
            <svg className="w-6 h-6" fill="currentColor" style={{ color: accentColor }} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-white text-base sm:text-lg md:text-xl font-medium">
            {displayEvent.location}
          </span>
        </div>
      </div>
    </div>
  );
}
