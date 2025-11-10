export const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Event" },
  { href: "#schedule", label: "Schedule" },
  { href: "#speakers", label: "Speakers" },
  { href: "#organisers", label: "Organisers" },
  { href: "#sponsors", label: "Sponsors" },
];

export const HERO = {
  title: "Welcome IEM Alumni #2",
  subtitle: "The Challenges of Web Innovation",
  date: "04 April 2023",
  address: "500 Terry Francois Street San Francisco, CA 94158",
  image: "/wiema-cover.webp",
};

export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
}

export const SCHEDULE_INTRO = {
  heading: "Event Schedule",
  description:
    "This isn’t another day-long session repeating the things we know. We’ve designed and framed them well, so every minute introduces a new concept and a different point of view to adopt.",
};

export const SCHEDULE: ScheduleItem[] = [
  { time: "08:45 AM", title: "Introduction & Opening", speaker: "James Scott" },
  {
    time: "09:00 AM",
    title: "Current Design Strategies",
    speaker: "Jane Roberts",
  },
  {
    time: "10:30 AM",
    title: "Future of Design & Web",
    speaker: "Hank Freeman",
  },
  { time: "12:30 PM", title: "Lunch Time", speaker: "Lunch Time" },
  {
    time: "01:30 PM",
    title: "Client and User Experience",
    speaker: "Robert Reid",
  },
  { time: "02:30 PM", title: "AI & Web Design", speaker: "Alex Keller" },
  { time: "03:30 PM", title: "Design Flow", speaker: "Tina Flores" },
  { time: "05:00 PM", title: "Conclusion & QA Session", speaker: "Mia Brownn" },
];

export interface SpeakerItem {
  name: string;
  title: string;
  image: string;
}

export const SPEAKERS_INTRO = {
  heading: "Meet the Speakers",
  description:
    "Our bench of speakers includes some well-established and successful designers who are known to be ruling the industry for years. Join the seminar and take a step closer to being an expert.",
};

export const SPEAKERS: SpeakerItem[] = [
  {
    name: "Jane Roberts",
    title: "Sr. Creative Designer",
    image:
      "https://websitedemos.net/event-02/wp-content/uploads/sites/863/2021/05/event-speaker-1.jpg",
  },
  {
    name: "Hank Freeman",
    title: "Web Developer",
    image:
      "https://websitedemos.net/event-02/wp-content/uploads/sites/863/2021/05/event-speaker-2-1.jpg",
  },
  {
    name: "Tina Flores",
    title: "UX Designer",
    image:
      "https://websitedemos.net/event-02/wp-content/uploads/sites/863/2021/05/event-speaker-3-1.jpg",
  },
  {
    name: "James Scott",
    title: "UX Analyst",
    image:
      "https://websitedemos.net/event-02/wp-content/uploads/sites/863/2021/05/event-speaker-4.jpg",
  },
];

export const ORGANISERS = {
  heading: "About the Organisers",
  description1:
    "We are team Creatives. Having organized over 60+ seminars in 12 different cities in just two years, we understand the latest trends to pick the right topic for our seminars. We have partnered several experts who’ve readily agreed to contribute to this good cause of sharing knowledge with passionate professionals.",
  description2:
    "Join this seminar and get a chance to meet us and join our team.",
  cta: "Reserve Your Spot Now!",
  image:
    "https://websitedemos.net/event-02/wp-content/uploads/sites/863/2021/05/organisers.jpg",
};

export const ABOUT = {
  heading: "About the Event",
  strong:
    "Are your designs the best? You may. But a design is the best only when it matches your client’s needs and brings more customers. Let us work on this together.",
  p1: "Like every once in a while we need to upgrade a technology to match with the latest trend, so is it with design. It is important to study and understand the client’s needs and merge it with the latest design trend that’ll help attract more customers.",
  p2: "In this special seminar, we’ll understand the changes observed in client requirements and some realistic designs that work.",
  cta: "Reserve My Spot",
};

export const SPONSORS_INTRO = {
  heading: "Our Sponsors",
  description:
    "It is not possible to host several seminars in different locations without helping hands. We have several sponsors who volunteer to help us physically and financially to make things happen.",
};

export const SPONSOR_LOGOS: string[] = [
  "https://websitedemos.net/brandstore-05/wp-content/uploads/sites/94/2020/06/client-logo-2.svg",
  "https://websitedemos.net/brandstore-05/wp-content/uploads/sites/94/2020/06/client-logo-1.svg",
  "https://websitedemos.net/brandstore-05/wp-content/uploads/sites/94/2020/06/client-logo-3.svg",
  "https://websitedemos.net/brandstore-05/wp-content/uploads/sites/94/2020/06/client-logo-4.svg",
  "https://websitedemos.net/brandstore-05/wp-content/uploads/sites/94/2020/06/client-logo-5.svg",
];

export const FOOTER = {
  title: "Design & Experience",
  aboutTitle: "About this Event",
  aboutText:
    "Join us on 4th of April while we open new prospects of trending designs and client requirements.",
  addressTitle: "Address",
  addressText: "500 Terry Francois Street San Francisco, CA 94158",
  dateTitle: "Date & Time",
  dateText: "04 April 2023\n9:00 AM – 3:00 PM",
  cta: "Get Tickets",
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d659.7029922633542!2d106.80159818456582!3d10.877464066879655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a415a9d221%3A0x550c2b41569376f9!2sInternational%20University%20-%20VNU-HCM!5e0!3m2!1sen!2s!4v1762787522936!5m2!1sen!2s",
  copyright:
    "Copyright © 2025 Event Landing Page | Powered By Event Landing Page",
};
