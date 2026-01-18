import { EventCarousel } from '../components/events/EventCarousel';

interface CarouselEvent {
  id: string;
  image: string;
  title: string;
  date: string;
  description: string;
}

function Events() {
  // Mock carousel data - all using same image
  const mockImage = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop';
  const events: CarouselEvent[] = [
    {
      id: '1',
      image: mockImage,
      title: 'Winter Gala',
      date: 'Jan 15, 2026',
      description:
        'Join us for an evening of music, food, and celebration as we ring in the new year with style and excitement. Formal attire required.',
    },
    {
      id: '2',
      image: mockImage,
      title: 'Tech Expo',
      date: 'Feb 10, 2026',
      description:
        'Explore the latest innovations in technology, meet industry leaders, and participate in hands-on workshops. Open to all ages.',
    },
    {
      id: '3',
      image: mockImage,
      title: 'Spring Festival',
      date: 'Mar 21, 2026',
      description:
        'Celebrate the arrival of spring with live performances, food trucks, games, and a vibrant community market.',
    },
    {
      id: '4',
      image: mockImage,
      title: 'Summer Concert Series',
      date: 'Jun 15, 2026',
      description:
        'Experience live music under the stars featuring local and regional artists. Bring your friends and family for a night to remember.',
    },
    {
      id: '5',
      image: mockImage,
      title: 'Fall Harvest Market',
      date: 'Oct 3, 2026',
      description:
        'Support local farmers and artisans at our annual harvest market. Fresh produce, handmade crafts, and live entertainment throughout the day.',
    },
    {
      id: '6',
      image: mockImage,
      title: 'Holiday Lighting Ceremony',
      date: 'Dec 1, 2026',
      description:
        'Kick off the holiday season with our spectacular lighting ceremony. Featuring holiday performances, festive food, and family activities.',
    },
  ];

  return (
    <div className="w-full flex flex-col px-4 py-28 sm:py-40">
      <h1
        className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-16 w-full max-w-6xl mx-auto text-left"
        style={{ fontFamily: 'var(--font-dosis)' }}
      >
        Upcoming Events
      </h1>

      {/* Carousel Container */}
      <div className="w-full max-w-6xl mx-auto">
        <EventCarousel events={events} />
      </div>
    </div>
  );
}

export default Events;