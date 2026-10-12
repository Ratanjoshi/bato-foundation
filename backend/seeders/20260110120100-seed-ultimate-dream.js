"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const existing = await queryInterface.sequelize.query(
      "SELECT COUNT(*) AS count FROM ultimate_dreams",
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    if (Number(existing[0].count) > 0) return;

    await queryInterface.bulkInsert("ultimate_dreams", [
      {
        eyebrow: "Our Ultimate Dream",
        heading:
          "A Nepal where no child's future is decided by a missing road.",
        description:
          "We dream of classrooms in every valley where robots are built, code is written, and possibility has no postcode.",
        button_label: "Help Build the Dream",
        button_href: "/donate",
        image_url: "/images/hero/girl-mountains.jpg",
        image_alt: "A student looking toward the horizon",
        is_active: true,
        order: 0,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("ultimate_dreams", null, {});
  },
};
