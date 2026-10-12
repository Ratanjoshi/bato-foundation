"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("besides_programs", [
      {
        icon: "FlaskConical",
        title: "Research",
        description: "Studying how technology access changes real outcomes.",
        order: 0,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        icon: "Lightbulb",
        title: "Innovation",
        description: "Designing low-cost, context-fit learning solutions.",
        order: 1,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        icon: "Wrench",
        title: "Development",
        description: "Building curriculum, kits and prototypes for the field.",
        order: 2,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        icon: "Share2",
        title: "Knowledge Sharing",
        description: "Open resources for teachers and facilitators.",
        order: 3,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        icon: "Users",
        title: "Community Engagement",
        description: "Working hand-in-hand with local communities.",
        order: 4,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("besides_programs", null, {});
  },
};
