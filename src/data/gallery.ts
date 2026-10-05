export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  category: string;
}

export const galleryCategories = [
  "All",
  "Education",
  "Community",
  "Research",
  "Events",
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/gallery/classroom.jpg",
    caption: "Hands-on robotics in the classroom",
    category: "Education",
  },
  {
    id: "g2",
    src: "/images/gallery/students-lab.jpg",
    caption: "Students building a weather station",
    category: "Community",
  },
  {
    id: "g3",
    src: "/images/gallery/drone.jpg",
    caption: "Learning drone technology in the field",
    category: "Research",
  },
  {
    id: "g4",
    src: "/images/gallery/mountain-girl.jpg",
    caption: "Dreaming beyond the mountains",
    category: "Community",
  },
  {
    id: "g5",
    src: "/images/gallery/computer-lab.jpg",
    caption: "A modern computer lab in action",
    category: "Education",
  },
  {
    id: "g6",
    src: "/images/gallery/team.jpg",
    caption: "BATO team in the field",
    category: "Events",
  },
  {
    id: "g7",
    src: "/images/gallery/coding-session.jpg",
    caption: "First coding session for students",
    category: "Education",
  },
  {
    id: "g8",
    src: "/images/gallery/community-meeting.jpg",
    caption: "Community engagement meeting",
    category: "Community",
  },
];
