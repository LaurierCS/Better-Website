/**
 * EventDetails Component
 * Displays event information with dynamic text scaling
 */

import { useEffect, useState, useRef } from 'react';
import type { EventData } from '../../data/eventsData';
import '../styles/eventTransitions.css';

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

  useEffect(() => {
    if (event.id !== displayEvent.id) {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

      transitionTimerRef.current = setTimeout(() => {
        setIsTransitioning(true);
        transitionTimerRef.current = setTimeout(() => {
          setDisplayEvent(event);
          setIsTransitioning(false);
        }, 300);
      }, 0);
    }

    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, [event.id, displayEvent.id, event]);

  return (
    <div
      className={`w-full h-full transition-opacity duration-300 flex flex-col ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ fontFamily: 'Dosis, sans-serif' }}
    >
      <h2
        className="font-black text-white leading-tight mb-6 event-detail-item whitespace-nowrap w-full min-w-0"
        style={{
          color: accentColor,
          fontSize: 'clamp(0.875rem, 3vw + 0.125rem, 3rem)',
        }}
      >
        {displayEvent.title.toUpperCase()}
      </h2>

      <p
        className="text-white/90 font-light leading-relaxed mb-4 event-detail-item max-h-[200px] overflow-y-auto w-full min-w-0"
        style={{
          fontSize: 'clamp(0.75rem, 1.5vw + 0.25rem, 1.5rem)',
        }}
      >
        {displayEvent.description}
      </p>

      <div className="space-y-3 mt-6 pt-0">
        <div className="flex items-center gap-4 event-detail-item">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: accentColor + '20', border: `1px solid ${accentColor}40` }}
          >
            <svg className="w-5 h-5" fill="currentColor" style={{ color: accentColor }} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1h2z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-white text-sm md:text-base">{displayEvent.date}</span>
        </div>

        <div className="flex items-center gap-4 event-detail-item">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: accentColor + '20', border: `1px solid ${accentColor}40` }}
          >
            <svg className="w-5 h-5" fill="currentColor" style={{ color: accentColor }} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-white text-sm md:text-base">{displayEvent.time}</span>
        </div>

        <div className="flex items-center gap-4 event-detail-item">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: accentColor + '20', border: `1px solid ${accentColor}40` }}
          >
            <svg className="w-5 h-5" fill="currentColor" style={{ color: accentColor }} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-white text-sm md:text-base">{displayEvent.location}</span>
        </div>
      </div>
    </div>
  );
}
