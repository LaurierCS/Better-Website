import EventCard from "../components/events/EventCard";

function Events() {
  // Example: Replace this array with your real event data source
  const events: { title: string; description: string; date: string }[] = [
    {
      title: "Tech Conference 2025",
      description: "Join us for a day of insightful talks and networking with industry leaders.",
      date: "Jan 15, 2025",
    },
    {
      title: "Hackathon",
      description: "Show off your coding skills and win prizes in our 24-hour hackathon event.",
      date: "Feb 10, 2025",
    },
    {
      title: "Workshop: AI for Beginners",
      description: "Learn the basics of Artificial Intelligence in this hands-on workshop.",
      date: "Mar 5, 2025",
    },
  ];

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
                accentColorIndex={0}
                centerText
                showSadFace
              />
            </div>
          </div>
        ) : (
          events.map((event, idx) => (
            <EventCard
              key={event.title + event.date}
              title={event.title}
              description={event.description}
              date={event.date}
              accentColorIndex={idx}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Events;