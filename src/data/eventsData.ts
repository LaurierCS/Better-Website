/**
 * Sample Events Data
 * Edit this file to add/remove/modify events
 */

export interface EventData {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
}

// Placeholder images from Unsplash (tech/coding themed)
const placeholderImages = {
    coding: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    lecture: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    networking: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    workshop: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
};

export const eventsData: EventData[] = [
    {
        id: 'cp164-review',
        title: 'CP164 Midterm Review',
        description:
            'An interactive midterm review session for computer science students taking the essential first year course, Data Structures (CP164). Refresh your knowledge of key concepts in a lively and interactive format!',
        date: 'February 11, 2026',
        time: '7:30 PM - 9:00 PM',
        location: 'Lazaridis Hall, Waterloo Campus',
        image: placeholderImages.coding,
    },
    {
        id: 'cp264-review',
        title: 'CP264 Midterm Review',
        description:
            'A comprehensive review session for Data Structures II (CP264). Engage with the material through mini quizzes and win exciting prizes while preparing for your midterm!',
        date: 'February 18, 2026',
        time: '7:30 PM - 9:00 PM',
        location: 'Science Building, Waterloo Campus',
        image: placeholderImages.lecture,
    },
    {
        id: 'meet-the-pros',
        title: 'Meet The Professionals',
        description:
            'Our flagship event bringing together industry professionals from different fields. Get first-hand insights about the tech industry and make meaningful connections.',
        date: 'March 5, 2026',
        time: '6:00 PM - 8:30 PM',
        location: 'Arts Building Atrium',
        image: placeholderImages.networking,
    },
    {
        id: 'coding-workshop',
        title: 'React Workshop',
        description:
            'Hands-on workshop covering React fundamentals, hooks, and best practices. Perfect for beginners looking to level up their frontend development skills.',
        date: 'March 12, 2026',
        time: '5:00 PM - 7:00 PM',
        location: 'Computer Lab, Lazaridis Hall',
        image: placeholderImages.workshop,
    },
];

export default eventsData;
