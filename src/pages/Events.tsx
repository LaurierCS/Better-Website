import { useEffect, useRef, useState } from "react";
import EventCard from "../components/events/EventCard";
import EventImage from "../components/events/EventImage";

function Events() {
  // Mock event data for demo purposes
  const events: { title: string; description: string; date: string }[] = [
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
    }
  ];

  // Animation state: only one bar animates at a time, in order 0,1,2,0,1,2...
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    setProgress(0);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const duration = 4000; // 4 seconds
      const prog = Math.min(1, elapsed / duration);
      setProgress(prog);
      if (prog < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // Reset progress to 0 before cycling to next event to prevent bar flash
        setProgress(0);
        setTimeout(() => {
          setActiveIdx((idx) => (idx + 1) % events.length);
        }, 50); // Short delay to allow bar to reset visually
      }
    }
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, events.length]);

  // Accent colors for the 3 events
  const accentColors = [
    'var(--color-accent-pink)',
    'var(--color-accent-orange)',
    'var(--color-accent-blue)'
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-t from-slate-800 to-slate-900 px-8 py-12">
      <h1 className="text-white text-5xl font-bold mb-6">Upcoming Events</h1>
      <div className="flex flex-row w-full">
        {/* Event Cards List */}
        <div className={`flex flex-col gap-8 w-full max-w-2xl pr-6 pl-6 ${events.length === 0 ? "items-center justify-center min-h-[300px]" : "items-start"}`}>
          {events.length === 0 ? (
            <div className="w-full flex justify-center">
              <div className="w-full max-w-3xl">
                <EventCard
                  title="No Events"
                  description="Come back later for future updates"
                  date=""
                  accentColor={accentColors[0]}
                />
              </div>
            </div>
          ) : (
            events.map((event, idx) => (
              <div
                key={event.title + event.date}
                className={
                  (idx === activeIdx
                    ? "scale-105 z-20 transition-transform duration-300"
                    : "scale-100 z-10 transition-transform duration-300")
                }
                style={{ willChange: "transform" }}
              >
                <EventCard
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  progress={idx === activeIdx ? progress : 0}
                  accentColor={accentColors[idx % accentColors.length]}
                  isActive={idx === activeIdx}
                />
              </div>
            ))
          )}
        </div>
        {/* Event Image: show only one image at a time, in sync with events */}
        <div
          className="flex flex-col items-center min-h-[400px] w-1/3 max-w-md gap-8 justify-end ml-24 pr-6 pt-8"
          style={{ height: '26rem' }}
        >
          <div
            key={activeIdx}
            className="rounded-2xl shadow-lg w-full h-full flex items-center justify-center bg-slate-700 scale-105 transition-all duration-300 overflow-hidden relative"
          >
            <EventImage src={`/images/event${activeIdx + 1}.jpg`} alt={`Event ${activeIdx + 1}`} />
            {/* Dots navigation */}
            <div className="absolute bottom-4 left-0 w-full flex justify-center items-center gap-3">
              {[0, 1, 2].map((idx) => (
                <span
                  key={idx}
                  className={
                    activeIdx === idx
                      ? "inline-block w-3 h-3 bg-white rounded-full"
                      : "inline-block w-2 h-2 bg-gray-400 rounded-full"
                  }
                  style={{ transition: 'all 0.2s' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;