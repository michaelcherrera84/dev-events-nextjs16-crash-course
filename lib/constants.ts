export type EventItem = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
};

export const events: EventItem[] = [
    {
        title: "Next.js Conf 2026",
        image: "/images/event1.png",
        slug: "nextjs-conf-2026",
        location: "San Francisco, CA",
        date: "2026-10-25",
        time: "10:00 AM",
    },
    {
        title: "React Summit 2026",
        image: "/images/event2.png",
        slug: "react-summit-2026",
        location: "Amsterdam, NL",
        date: "2026-06-12",
        time: "09:00 AM",
    },
    {
        title: "JSWorld Conference",
        image: "/images/event3.png",
        slug: "jsworld-conference",
        location: "Online",
        date: "2026-02-15",
        time: "11:00 AM",
    },
    {
        title: "HackTheFuture 2026",
        image: "/images/event4.png",
        slug: "hack-the-future-2026",
        location: "New York, NY",
        date: "2026-08-20",
        time: "08:00 AM",
    },
    {
        title: "TypeScript Congress",
        image: "/images/event5.png",
        slug: "typescript-congress",
        location: "Berlin, DE",
        date: "2026-11-05",
        time: "10:30 AM",
    },
    {
        title: "Tech Meetup London",
        image: "/images/event6.png",
        slug: "tech-meetup-london",
        location: "London, UK",
        date: "2026-05-30",
        time: "06:30 PM",
    },
];
