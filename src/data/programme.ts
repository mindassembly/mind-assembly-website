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
  materials?: { title: string; url: string }[];
};

export const discussions: Discussion[] = [
  {
    title: 'Paper-reading circles',
    description: 'Small facilitated discussions of a paper’s research question, methods and limitations.',
    status: 'Proposed'
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
