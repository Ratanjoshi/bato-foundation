"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert("about_previews", [
      {
        badge: "What is BATO Foundation?",
        title: "A road from talent to opportunity.",
        paragraph1:
          'In Nepali, bato means "the road." BATO Foundation is a purely social, non-profit-distributing organization registered in Lalitpur. We exist to close the technology gap for students and communities — especially in public schools, rural areas, and places without resources.',
        paragraph2:
          "We deliver STEM education, coding, robotics, AI literacy and digital skills — and we build the curriculum, low-cost kits and teacher training that make it last.",
        buttonText: "Learn More About BATO",
        buttonLink: "/about",
        imageUrl: "/images/hero/classroom-teacher.jpg", // Will be replaced when admin uploads a real file
        imageAlt: "Teacher helping students build robots in a rural classroom",
        floatingTitle: "STEM",
        floatingText: "Learning that reaches where roads don't.",
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("about_previews", null, {});
  },
};
