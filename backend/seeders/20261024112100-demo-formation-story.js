"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("formation_stories", [
      {
        badgeLabel: "How was BATO Foundation formed?",
        headingLead: "A road that began with a",
        headingAccent: "simple belief.",
        imageUrl: "/images/hero/university-lab.jpg",
        imageAlt: "Students collaborating in a computer lab",
        locationLabel: "Registered office",
        locationValue: "Lalitpur",
        introParagraph:
          "BATO Foundation was established as a purely social, non-profit-distributing company under the Companies Act, 2063, with its registered office in Lalitpur. It was founded by individuals who believed that access to technology should not depend on where a child is born.",
        secondaryParagraph:
          "BATO focuses on improving access to technology and learning opportunities, particularly for public schools, rural communities and places with limited resources. Its work includes STEM education, coding, robotics, AI literacy and digital skills.",
        quoteText:
          "Access to technology should not depend on where a child is born.",
        noteIndex: "01",
        noteLabel: "Founding Note",
        noteTitle: "Building the road to opportunity.",
        noteParagraph1:
          "BATO Foundation was established as a purely social, non-profit-distributing company under the Companies Act, 2063, with its registered office in Lalitpur.",
        noteParagraph2:
          "The foundation was created around the belief that access to technology should not depend on where a child is born, with a focus on reaching students and communities that have fewer opportunities to access technology and digital learning.",
        noteParagraph3:
          "BATO's work connects students with STEM education, coding, robotics, AI literacy and digital skills, helping create pathways from technology to opportunity.",
        noteFooter: "Technology · Learning · Opportunity",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("formation_stories", null, {});
  },
};
