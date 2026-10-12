"use strict";

const jwt = require("jsonwebtoken");
const { donationCtaModel } = require("../../models");
const { deleteUploadedFile } = require("../../utils/file-helper");

/* ------------------------------- AUTH ---------------------------------- */
const adminLogin = async (email, password) => {
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    const err = new Error("Invalid credentials.");
    err.statusCode = 401;
    throw err;
  }
  const token = jwt.sign(
    { id: 1, email, role: "admin", roleId: 1 },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
  return { token };
};

/* ----------------------- PUBLIC: active CTA ----------------------------- */
const getPublicDonationCta = async () => {
  const cta = await donationCtaModel.findOne({
    where: { is_active: true },
    order: [["updated_at", "DESC"]],
  });
  if (!cta) {
    const err = new Error("Donation CTA not found.");
    err.statusCode = 404;
    throw err;
  }
  return cta;
};

/* ---------------------- ADMIN: latest CTA ------------------------------- */
const getAdminDonationCta = async () => {
  return donationCtaModel.findOne({ order: [["updated_at", "DESC"]] });
};

/* --------------------------- UPSERT ------------------------------------ */
const upsertDonationCta = async (payload, file) => {
  const newImageUrl = file ? `/uploads/${file.filename}` : null;

  let cta = await donationCtaModel.findOne({
    order: [["updated_at", "DESC"]],
  });

  // If replacing image, delete the old file
  if (cta && newImageUrl && cta.image_url) {
    await deleteUploadedFile(cta.image_url);
  }

  const data = {
    eyebrow: payload.eyebrow ?? cta?.eyebrow ?? "Donate",
    heading: payload.heading,
    description: payload.description,
    primary_label: payload.primaryLabel ?? cta?.primary_label ?? "Donate Now",
    primary_href: payload.primaryHref ?? cta?.primary_href ?? "/donate",
    secondary_label:
      payload.secondaryLabel ?? cta?.secondary_label ?? "Where Your Gift Goes",
    secondary_href:
      payload.secondaryHref ?? cta?.secondary_href ?? "/donate#usage",
    image_url: newImageUrl ?? cta?.image_url,
    image_alt: payload.imageAlt ?? cta?.image_alt ?? "",
    is_active:
      payload.isActive !== undefined
        ? payload.isActive === true || payload.isActive === "true"
        : (cta?.is_active ?? true),
  };

  if (!data.image_url) {
    if (file) await deleteUploadedFile(newImageUrl);
    const err = new Error("An image is required. Please upload one.");
    err.statusCode = 400;
    throw err;
  }

  if (cta) {
    await cta.update(data);
  } else {
    cta = await donationCtaModel.create(data);
  }

  return cta;
};

/* ---------------------------- DELETE ----------------------------------- */
const deleteDonationCta = async (id) => {
  const cta = await donationCtaModel.findByPk(id);
  if (!cta) {
    const err = new Error("Donation CTA not found.");
    err.statusCode = 404;
    throw err;
  }
  if (cta.image_url) await deleteUploadedFile(cta.image_url);
  await cta.destroy();
  return true;
};

module.exports = {
  adminLogin,
  getPublicDonationCta,
  getAdminDonationCta,
  upsertDonationCta,
  deleteDonationCta,
};
