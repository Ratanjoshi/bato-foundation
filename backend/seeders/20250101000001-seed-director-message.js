"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("director_messages", [
      {
        name: "Prashant Thapa",
        role: "Executive Director",
        org: "BATO Foundation",
        photo: null, // set to '/images/team/prashant-thapa.jpg' once uploaded
        message: JSON.stringify([
          "BATO began with a simple belief: talent is everywhere in Nepal, but access is not. Too many bright students never get to touch a computer, meet a mentor, or see what a career in technology could look like.",
          "Our work is to change that. We bring learning kits into classrooms, train teachers with practical skills, and open doors to devices and connectivity, so that where a child is born no longer decides what they can become.",
          "None of this is possible without our volunteers, partners, and donors, and the families who trust us with their children's future. Thank you for walking this road with us.",
        ]),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("director_messages", null, {});
  },
};
