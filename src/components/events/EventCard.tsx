/**
 * EventCard Component
 * Displays a single event with image, title, date/time/location, and description.
 * Accent color is assigned cyclically from the site palette.
 */

import RevealOnScroll from '../universal/RevealOnScroll';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;       // ISO date string e.g. "2026-03-10"
  time: string;       // Display string e.g. "6:00 PM – 8:00 PM"
  location: string;
  picture_url: string | null;
}

interface EventCardProps {
  event: Event;
  index: number;
}

const ACCENT_COLORS = [
  { border: '#FF9FC4', shadow: 'rgba(255,159,196,0.25)', tag: 'bg-[#FF9FC4]' },
  { border: '#FF9770', shadow: 'rgba(255,151,112,0.25)', tag: 'bg-[#FF9770]' },
  { border: '#FFD670', shadow: 'rgba(255,214,112,0.25)', tag: 'bg-[#FFD670]' },
  { border: '#268AF9', shadow: 'rgba(38,138,249,0.25)',  tag: 'bg-[#268AF9]' },
];

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/** Formats "2026-03-10" → "March 10, 2026" */
function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function EventCard({ event, index }: EventCardProps) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <RevealOnScroll
      visibleClassName="fadeSlideUpFast"
      rootMargin="40px"
      once={true}
      className="flex flex-col h-full"
    >
      <div
        className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1.5px solid rgba(255,255,255,0.08)`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${accent.shadow}`)
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)')
        }
      >
        {/* Accent Top Bar */}
        <div className="h-1 w-full shrink-0" style={{ backgroundColor: accent.border }} />

        {/* Event Image */}
        <div className="relative w-full h-48 overflow-hidden bg-[#1e2a33]">
          {event.picture_url ? (
            <img
              src={event.picture_url}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl">
              📅
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-6 flex-1">
          {/* Title */}
          <h3
            className="font-dosis font-bold text-white text-2xl leading-tight group-hover:transition-colors duration-200"
            style={{ fontFamily: 'Dosis, sans-serif', color: 'white' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLHeadingElement).style.color = accent.border)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLHeadingElement).style.color = 'white')}
          >
            {event.title}
          </h3>

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 gap-y-2 text-gray-400 text-sm font-dosis">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <CalendarIcon />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap">
              <ClockIcon />
              {event.time}
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap">
              <PinIcon />
              {event.location}
            </span>
          </div>

          {/* Description */}
          <p className="font-dosis font-light text-white text-sm sm:text-base md:text-base lg:text-lg leading-relaxed line-clamp-4 mt-auto pt-3 border-t border-white/5" style={{ fontFamily: 'Dosis, sans-serif' }}>
            {event.description}
          </p>
        </div>
      </div>
    </RevealOnScroll>
  );
}

export default EventCard;
