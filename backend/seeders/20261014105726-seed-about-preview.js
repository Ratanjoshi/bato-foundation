"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("about_previews", [
      {
        badge: "About Us",
        title: "Building technology skills for every community",
        paragraph1:
          "BATO Foundation works with schools, teachers, and communities to bring hands-on STEM education to places without access.",
        paragraph2:
          "Through robotics, coding, and local mentorship, we help learners build the skills they need to shape their own future.",
        buttonText: "Learn More",
        buttonLink: "/about",
        imageUrl: "resources/1791885715229-8umva1r0-bato-hero-students-a.jpg",
        imageAlt: "Students working together on a robotics project",
        floatingTitle: "500+",
        floatingText: "Students reached across Nepal",
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("about_previews", null, {});
  },
};
