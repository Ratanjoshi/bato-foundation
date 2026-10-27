"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "LeadershipMembers",
      [
        {
          name: "Prashant Thapa",
          role: "Founder & Chairperson",
          image: "/team/prashant.jpg",
          portfolio: "https://prashantthapa.com",
          order: 1,
          published: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add the rest of your team here...
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("LeadershipMembers", null, {});
  },
};
