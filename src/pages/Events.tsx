import React, { useEffect, useRef, useState } from "react";
import EventCard from "../components/events/EventCard";

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

  // Animation state: progress for each event
  const [progressArr, setProgressArr] = useState(Array(events.length).fill(0));
  const [activeIdx, setActiveIdx] = useState(events.length - 1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset all bars except the active one to 0
    setProgressArr((prev) => prev.map((_, i) => (i === activeIdx ? 0 : 0)));
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgressArr((prev) => {
        const updated = [...prev];
        if (updated[activeIdx] >= 1) {
          updated[activeIdx] = 1;
          clearInterval(intervalRef.current!);
          // Move to previous bar after a short delay
          setTimeout(() => {
            setProgressArr((arr) => arr.map((_, i) => (i === ((activeIdx - 1 + events.length) % events.length) ? 0 : 0)));
            setActiveIdx((idx) => (idx - 1 + events.length) % events.length);
          }, 0);
        } else {
          updated[activeIdx] = Math.min(1, updated[activeIdx] + 1 / (7 * 60));
        }
        return updated;
      });
    }, 1000 / 60);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, events.length]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-t from-slate-800 to-slate-900 px-8 py-12">
      <h1 className="text-white text-5xl font-bold mb-6">Upcoming Events</h1>
      <div className={`events-list flex flex-col gap-8 w-full max-w-full ${events.length === 0 ? "items-center justify-center min-h-[300px]" : "items-start"}`}>
        {events.length === 0 ? (
          <div className="w-full flex justify-center">
            <div className="w-full max-w-3xl">
              <EventCard
                title="No Events"
                description="Come back later for future updates"
                date=""
                centerText
                showSadFace
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
                progress={progressArr[idx]}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;