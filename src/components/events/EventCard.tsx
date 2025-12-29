import Info from './card_children/Info';
import Bar from './card_children/Bar';
import { useMemo } from 'react';

type EventCardProps = {
  title: string;
  description: string;
  date: string;
  centerText?: boolean;
  showSadFace?: boolean;
  progress?: number;
};

const EventCard: React.FC<EventCardProps> = ({ title, description, date, centerText, showSadFace, progress }) => {
  const accentColors = [
    'var(--color-accent-pink)',
    'var(--color-accent-orange)',
    'var(--color-accent-yellow)',
    'var(--color-accent-blue)',
    'var(--color-accent-light-blue)'
  ];
  const glowColor = useMemo(() => {
    const idx = Math.floor(Math.random() * accentColors.length);
    return accentColors[idx];
  }, []);

  return (
    <div
      className="relative rounded-2xl transition-all duration-300 hover:scale-105 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl m-0 p-0"
      style={{
        boxShadow: `0 0 12px 2px ${glowColor}` // Reduced glow: less blur and spread
      }}
    >
      <div className="relative bg-transparent text-white rounded-2xl shadow-lg z-10 w-full h-full flex flex-col gap-0 m-0 p-0">
        <Info title={title} description={description} date={date} centerText={centerText} showSadFace={showSadFace} />
        <Bar progress={progress} />
      </div>
    </div>
  );
};

// Mock data and demo rendering for standalone display
export function EventCardDemo() {
  const mockEvents = [
    {
      title: "Winter Gala",
      description: "Join us for an evening of music, food, and celebration as we ring in the new year with style and excitement. Formal attire required.",
      date: "Jan 15, 2026"
    },
    {
      title: "Tech Expo",
      description: "Explore the latest innovations in technology, meet industry leaders, and participate in hands-on workshops. Open to all ages.",
      date: "Feb 10, 2026"
    },
    {
      title: "Spring Festival",
      description: "Celebrate the arrival of spring with live performances, food trucks, games, and a vibrant community market.",
      date: "Mar 21, 2026"
    },
    {
      title: "Charity Run",
      description: "Support local charities by joining our 5K run. All proceeds go to community projects. Register online to participate.",
      date: "Apr 5, 2026"
    },
    {
      title: "Art Showcase",
      description: "Discover works from talented local artists. Paintings, sculptures, and digital art on display. Free entry for all attendees.",
      date: "May 12, 2026"
    }
  ];

  return (
    <div className="flex flex-col items-center gap-8 min-h-screen bg-slate-900 py-12">
      {mockEvents.map((event, idx) => (
        <EventCard
          key={event.title + event.date}
          title={event.title}
          description={event.description}
          date={event.date}
        />
      ))}
    </div>
  );
}

export default EventCard;