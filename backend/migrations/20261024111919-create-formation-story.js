"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("formation_stories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      badgeLabel: { type: Sequelize.STRING, allowNull: false },
      headingLead: { type: Sequelize.STRING, allowNull: false },
      headingAccent: { type: Sequelize.STRING, allowNull: false },
      imageUrl: { type: Sequelize.STRING, allowNull: false },
      imageAlt: { type: Sequelize.STRING, allowNull: false },
      locationLabel: { type: Sequelize.STRING, allowNull: false },
      locationValue: { type: Sequelize.STRING, allowNull: false },
      introParagraph: { type: Sequelize.TEXT, allowNull: false },
      secondaryParagraph: { type: Sequelize.TEXT, allowNull: false },
      quoteText: { type: Sequelize.TEXT, allowNull: false },
      noteIndex: { type: Sequelize.STRING, allowNull: false },
      noteLabel: { type: Sequelize.STRING, allowNull: false },
      noteTitle: { type: Sequelize.STRING, allowNull: false },
      noteParagraph1: { type: Sequelize.TEXT, allowNull: false },
      noteParagraph2: { type: Sequelize.TEXT, allowNull: false },
      noteParagraph3: { type: Sequelize.TEXT, allowNull: false },
      noteFooter: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("formation_stories");
  },
};
