export type Project = {
  title: string;
  description: string;
  category: string;
  status: 'Proposed' | 'Active' | 'Completed' | 'Published';
  objectives?: string;
  team?: string[];
  timeline?: string;
  outputs?: { title: string; url: string }[];
};

export const projects: Project[] = [
  {
    title: 'Body image and digital life',
    description: 'A discussion about appearance-based comparison and body-image concerns in online environments.',
    category: 'Discussion topic',
    status: 'Proposed'
  },
  {
    title: 'Unspoken emotional signalling',
    description: 'A discussion about what liking and sharing posts can communicate about emotional states.',
    category: 'Discussion topic',
    status: 'Proposed'
  }
];

export type Discussion = {
  title: string;
  description: string;
  status: 'Proposed' | 'Confirmed' | 'Past';
  date?: string;
  registration?: string;
  photos?: { src: string; alt: string }[];
  materials?: { title: string; url: string }[];
};

export const discussions: Discussion[] = [
  {
    title: 'Paper-reading circles',
    description: 'Small facilitated discussions of a paper’s research question, methods and limitations.',
    status: 'Proposed'
  },
  {
    title: 'Five-Day Nutrition Week',
    description: 'Sarah served as a judge and keynote speaker during a five-day school nutrition programme in Srinagar. Students presented dishes at the programme, which was held in collaboration with FSSAI through its Eat Right Schools initiative.',
    status: 'Past',
    photos: [
      { src: '/images/nutrition-week/food-display.webp', alt: 'Students present dishes at a Nutrition Week food display.' },
      { src: '/images/nutrition-week/lunch-display.webp', alt: 'A student presents a lunch spread at the school nutrition mela.' },
      { src: '/images/nutrition-week/tasting-table.webp', alt: 'A food presentation in front of the Eat Right Schools banner.' },
      { src: '/images/nutrition-week/school-food-stall.webp', alt: 'Students explain their dishes at a school food stall.' },
      { src: '/images/nutrition-week/student-presentations.webp', alt: 'Students stand alongside the dishes they presented.' },
      { src: '/images/nutrition-week/judging-table.webp', alt: 'Judges and students gather around the tasting table.' }
    ]
  }
];

export type Issue = {
  slug: string;
  title: string;
  published: string;
  sections: {
    name: 'Research Focus' | 'Beyond the Textbook' | 'Perspectives' | 'Student Contributions' | 'Research Watch';
    readings: { title: string; url: string }[];
  }[];
};

export const issues: Issue[] = [];
