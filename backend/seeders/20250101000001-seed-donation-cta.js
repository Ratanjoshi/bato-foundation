"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("donation_ctas", [
      {
        eyebrow: "Donate",
        heading: "Fund a future built on technology.",
        description:
          "100% of what we raise goes toward our mission: learning kits, teacher training, robotics, and reaching communities without access.",
        primary_label: "Donate Now",
        primary_href: "/donate",
        secondary_label: "Where Your Gift Goes",
        secondary_href: "/donate#usage",
        image_url: "/uploads/donation-cta/default.jpg",
        image_alt: "Students building robotics projects together",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("donation_ctas", null, {});
  },
};
