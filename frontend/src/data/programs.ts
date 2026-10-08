export interface Program {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: "Ongoing" | "Upcoming" | "Completed";
  location: string;
  description: string;
  longDescription: string;
  image: string;
}

export const programCategories = [
  "All",
  "Education",
  "Robotics",
  "AI & Coding",
  "Research",
  "Community",
] as const;

export const programs: Program[] = [
  {
    id: "p1",
    slug: "stem-in-public-schools",
    title: "STEM in Public Schools",
    category: "Education",
    status: "Ongoing",
    location: "Rural Nepal",
    description:
      "Bringing hands-on science, technology, engineering and math learning to public schools where access to these subjects has been limited.",
    longDescription:
      "Our flagship initiative reaches public schools across rural Nepal, equipping classrooms with STEM learning materials, low-cost experiment kits, and trained facilitators. We focus on schools that have had no exposure to technology-based learning, creating a structured curriculum adapted to local languages and contexts. [Additional programme details, impact data and stories to be added.]",
    image: "/images/programs/stem-classroom.jpg",
  },
  {
    id: "p2",
    slug: "robotics-for-every-child",
    title: "Robotics for Every Child",
    category: "Robotics",
    status: "Ongoing",
    location: "Community Learning Centers",
    description:
      "Low-cost robotics kits and mentorship that turn curiosity into creation — one small robot at a time.",
    longDescription:
      "We design and distribute affordable robotics kits made from locally-sourced materials. Students learn electronics, mechanical thinking and programming through hands-on projects, guided by trained community mentors. [Additional programme details to be added.]",
    image: "/images/programs/robotics.jpg",
  },
  {
    id: "p3",
    slug: "coding-and-ai-literacy",
    title: "Coding & AI Literacy",
    category: "AI & Coding",
    status: "Ongoing",
    location: "Nationwide",
    description:
      "Introducing coding, computer programming and foundational AI concepts to students, teachers and community facilitators.",
    longDescription:
      "Our coding and AI literacy programme introduces age-appropriate programming concepts, computational thinking, and artificial intelligence fundamentals. We provide curriculum, software tools, and teacher training so these skills can be taught independently. [Additional details to be added.]",
    image: "/images/programs/coding-ai.jpg",
  },
  {
    id: "p4",
    slug: "teacher-capacity-building",
    title: "Teacher Capacity Building",
    category: "Education",
    status: "Ongoing",
    location: "Partner Schools",
    description:
      "Equipping teachers and local facilitators to independently run technology and digital-literacy education.",
    longDescription:
      "Sustainability means teachers who can lead without us. We train educators in STEM pedagogy, coding instruction, robotics facilitation, and digital tools — building a network of capable local leaders. [Additional details to be added.]",
    image: "/images/programs/teacher-training.jpg",
  },
  {
    id: "p5",
    slug: "field-research-impact",
    title: "Field Research & Impact Study",
    category: "Research",
    status: "Upcoming",
    location: "Study Districts",
    description:
      "Research, pilot programmes and impact assessment measuring how technology access changes outcomes.",
    longDescription:
      "We conduct rigorous research and pilot programmes to understand what works. Our impact assessments measure learning outcomes, engagement, and long-term effects of technology access in underserved communities. [Research publications and findings to be added.]",
    image: "/images/programs/research.jpg",
  },
  {
    id: "p6",
    slug: "community-tech-drones",
    title: "Community Technology & Drones",
    category: "Community",
    status: "Upcoming",
    location: "Mountain Communities",
    description:
      "Applied technology — from drones to remote sensing — for disaster preparedness and community development.",
    longDescription:
      "Beyond classrooms, we apply technology directly to community challenges: drone mapping for disaster preparedness, remote sensing for environmental monitoring, and early warning systems for vulnerable mountain communities. [Programme launch details to be added.]",
    image: "/images/programs/drones.jpg",
  },
];
