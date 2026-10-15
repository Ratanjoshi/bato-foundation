// backend/seeders/20250101000001-what-we-do-seed.js
"use strict";

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const seedData = [
  {
    icon: "GraduationCap",
    title: "STEM Education",
    desc: "Science, technology, engineering and math learning for schools without access.",
    points: [
      "Hands-on classroom learning",
      "Low-cost experiment kits",
      "Local-language curriculum",
    ],
    image: "/images/programs/stem-classroom.jpg",
    order: 0,
  },
  {
    icon: "Bot",
    title: "Robotics",
    desc: "Low-cost robotics kits that let students learn by building.",
    points: [
      "Kits from local materials",
      "Electronics & mechanics",
      "Guided by community mentors",
    ],
    image: "/images/programs/robotics.jpg",
    order: 1,
  },
  {
    icon: "Code2",
    title: "Coding & AI",
    desc: "Programming and artificial-intelligence literacy for the next generation.",
    points: [
      "Computational thinking",
      "Age-appropriate AI basics",
      "Software tools & curriculum",
    ],
    image: "/images/programs/coding-ai.jpg",
    order: 2,
  },
  {
    icon: "FlaskConical",
    title: "Research",
    desc: "Pilot programmes and impact assessment for technology in education.",
    points: [
      "Pilot before scaling",
      "Measure real outcomes",
      "Improve through evidence",
    ],
    image: "/images/programs/research.jpg",
    order: 3,
  },
  {
    icon: "Users",
    title: "Capacity Building",
    desc: "Training teachers and local facilitators to teach independently.",
    points: [
      "Teacher training",
      "Facilitator mentoring",
      "Skills that stay local",
    ],
    image: "/images/programs/teacher-training.jpg",
    order: 4,
  },
  {
    icon: "Compass",
    title: "Community Tech",
    desc: "Applied technology for development, disaster preparedness and resilience.",
    points: [
      "Drones & field technology",
      "Disaster preparedness",
      "Technology for development",
    ],
    image: "/images/programs/drones.jpg",
    order: 5,
  },
];

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // Every row MUST have the same keys in the same order.
    const rows = seedData.map((d) => ({
      icon: d.icon,
      title: d.title,
      slug: slugify(d.title),
      desc: d.desc,
      points: JSON.stringify(d.points), // ← JSON column needs a string
      image: d.image,
      order: d.order,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("what_we_do", rows, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "what_we_do",
      { slug: { [Sequelize.Op.in]: seedData.map((d) => slugify(d.title)) } },
      {},
    );
  },
};
