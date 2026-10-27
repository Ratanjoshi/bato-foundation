"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Timelines",
      [
        {
          year: "2083 B.S.",
          title: "Foundation Established",
          description:
            "BATO Foundation is registered under the Companies Act, 2063 as a non-profit-distributing social company based in Lalitpur, Nepal.",
          image: "/images/timeline/foundation.jpg",
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          year: "Phase 1",
          title: "First Learning Pilots",
          description:
            "[Placeholder — details of the first STEM and coding pilot programmes to be added once available.]",
          image: "/images/timeline/pilots.jpg",
          order: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          year: "Phase 2",
          title: "Partnership Building",
          description:
            "[Placeholder — school, government and donor partnerships to be documented as they are confirmed.]",
          image: "/images/timeline/partnerships.jpg",
          order: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          year: "Present",
          title: "Scaling Access Across Nepal",
          description:
            "Expanding technology, robotics and AI literacy to more communities, schools and districts across the country.",
          image: "/images/timeline/scaling.jpg",
          order: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Timelines", null, {});
  },
};
