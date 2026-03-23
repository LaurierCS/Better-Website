export interface HighlightItem {
    title: string;
    description: string;
}

export interface TimelineDay {
    day: string;
    dateLabel: string;
    items: Array<{
        time: string;
        title: string;
        details?: string;
    }>;
}

export interface PrizeItem {
    placement: string;
    amount: string;
    description: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export const HACKATHON_LINKS = {
    signup: 'https://forms.gle/2wMjeRrbbq3eptpc9',
    devpost: 'https://temp.com/devpost',
} as const;

// Countdown target: Friday, March 27, 2026 at 7:30 PM in Toronto (EDT, UTC-4)
export const HACKATHON_COUNTDOWN_TARGET = '2026-03-27T19:30:00-04:00';

export const HACKATHON_EVENT = {
    title: 'Hack to the Future',
    subtitle: 'Build the future of job mentorship in 48 hours',
    host: 'Laurier Computing Society',
    duration: '48-Hour Hackathon',
    dateRange: 'March 27-29, 2026',
    challengeTitle: 'The Challenge',
    challengeDescription:
        'Design and build a system that connects students entering the job market with mentors or past interns who can offer insights, advice, or resources related to their roles.',
} as const;

export const HACKATHON_HIGHLIGHTS: HighlightItem[] = [
    {
        title: 'Direct Engineering Support',
        description:
            '3 hours of dedicated office hours via Discord on Saturday for debugging, architecture, and product direction.',
    },
    {
        title: 'Industry and Alumni Judges',
        description: 'Get feedback from professionals and alumni currently working in tech.',
    },
    {
        title: 'Startup-Level Potential',
        description: 'Build an idea that could become a real venture solving a real student pain point.',
    },
    {
        title: 'Community and Momentum',
        description: 'Network with students and mentors, then present your solution to a live audience.',
    },
];

export const HACKATHON_TIMELINE: TimelineDay[] = [
    {
        day: 'Friday',
        dateLabel: 'March 27',
        items: [
            {
                time: '6:30 - 7:00 PM',
                title: 'Check-in and Registration',
                details: 'QR sign-in, Discord onboarding, and snacks.',
            },
            {
                time: '7:15 - 8:00 PM',
                title: 'Opening Ceremony',
                details: 'Challenge deep dive, judging criteria, and submission walkthrough.',
            },
            {
                time: '8:00 PM (Optional)',
                title: 'What Is a Hackathon? Session',
                details: 'Guest speaker, Q&A, and strategy tips for new participants.',
            },
        ],
    },
    {
        day: 'Saturday',
        dateLabel: 'March 28',
        items: [
            {
                time: 'All Day',
                title: 'Build and Iterate',
                details: 'Hack from the LCS room or remotely with any stack.',
            },
            {
                time: '3 Hours (Discord)',
                title: 'Engineering Office Hours',
                details: 'Live support from the engineering team. Exact times posted on Discord.',
            },
        ],
    },
    {
        day: 'Sunday',
        dateLabel: 'March 29',
        items: [
            {
                time: '1:30 PM',
                title: 'Submission Deadline',
                details: 'Devpost closes at 1:30 PM sharp.',
            },
            {
                time: '1:30 - 4:30 PM',
                title: 'Judging Period',
                details: 'Judges review projects and team headshots are captured.',
            },
            {
                time: '4:30 - 7:30 PM',
                title: 'Closing Ceremony and Awards',
                details: 'Presentations, live Q&A, winners, networking, and celebration.',
            },
        ],
    },
];

export const HACKATHON_PRIZES: PrizeItem[] = [
    {
        placement: '1st Place',
        amount: '$300 CAD',
        description: 'Best overall solution to the mentorship challenge.',
    },
    {
        placement: '2nd Place',
        amount: '$150 CAD',
        description: 'Strong technical execution and clear user value.',
    },
    {
        placement: '3rd Place',
        amount: '$100 CAD',
        description: 'Solid implementation and thoughtful approach.',
    },
];

export const HACKATHON_CATEGORY_AWARDS: PrizeItem[] = [
    {
        placement: 'Best Design/UI',
        amount: '$50 CAD',
        description: 'Most polished and user-friendly interface.',
    },
    {
        placement: 'Best Creative Presentation',
        amount: '$50 CAD',
        description: 'Most engaging pitch and demo storytelling.',
    },
    {
        placement: 'Most Likely to Become a Startup',
        amount: '$50 CAD',
        description: 'Strongest business potential and scalability.',
    },
];

export const HACKATHON_TOTAL_PRIZE_POOL = '$700 CAD';

export const HACKATHON_FAQS: FAQItem[] = [
    {
        question: 'Who can participate?',
        answer:
            'University students are welcome. Build solo or with a team and pick any technology stack that helps you ship.',
    },
    {
        question: 'Do I need prior hackathon experience?',
        answer:
            'No. There is an optional onboarding session plus engineering office hours to help you get unstuck quickly.',
    },
    {
        question: 'Can I work remotely?',
        answer:
            'Yes. You can build in the LCS room or from home. Discord is the central place for announcements and support.',
    },
    {
        question: 'What makes a strong submission?',
        answer:
            'Focus on solving the mentorship gap with a clear user flow, practical implementation, and a compelling final demo.',
    },
];