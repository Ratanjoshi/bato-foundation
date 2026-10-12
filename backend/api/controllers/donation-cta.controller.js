"use strict";

const HttpStatus = require("http-status");
const responseHelper = require("../../helpers/response-helper");
const { EN } = require("../../constants/message-constant");
const donationCtaService = require("../services/donation-cta.service");
const { deleteUploadedFile } = require("../../utils/file-helper");

const donationCtaController = {};

/* ------------------------------- LOGIN ---------------------------------- */
donationCtaController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await donationCtaService.adminLogin(email, password);

    return responseHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      result,
      null,
      "Login successful",
      null,
    );
  } catch (err) {
    return responseHelper.sendResponse(
      res,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      false,
      null,
      null,
      err.message,
      null,
    );
  }
};

/* --------------------------- PUBLIC GET --------------------------------- */
donationCtaController.getPublic = async (req, res) => {
  try {
    const cta = await donationCtaService.getPublicDonationCta();

    return responseHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      cta,
      null,
      EN.DONATION_CTA_FETCHED || "Donation CTA fetched successfully",
      null,
    );
  } catch (err) {
    return responseHelper.sendResponse(
      res,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      false,
      null,
      null,
      err.message,
      null,
    );
  }
};

/* ---------------------------- ADMIN GET --------------------------------- */
donationCtaController.getAdmin = async (req, res) => {
  try {
    const cta = await donationCtaService.getAdminDonationCta();

    return responseHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      cta,
      null,
      EN.DONATION_CTA_FETCHED || "Donation CTA fetched successfully",
      null,
    );
  } catch (err) {
    return responseHelper.sendResponse(
      res,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      false,
      null,
      null,
      err.message,
      null,
    );
  }
};

/* ----------------------------- UPSERT ----------------------------------- */
donationCtaController.upsert = async (req, res) => {
  try {
    const { heading, description } = req.body;

    if (!heading || !description) {
      if (req.file) {
        await deleteUploadedFile(`/uploads/${req.file.filename}`);
      }
      return responseHelper.sendResponse(
        res,
        HttpStatus.BAD_REQUEST,
        false,
        null,
        null,
        "Heading and description are required.",
        null,
      );
    }

    const cta = await donationCtaService.upsertDonationCta(req.body, req.file);

    return responseHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      cta,
      null,
      EN.DONATION_CTA_SAVED || "Donation CTA saved successfully",
      null,
    );
  } catch (err) {
    if (req.file) {
      await deleteUploadedFile(`/uploads/${req.file.filename}`);
    }
    return responseHelper.sendResponse(
      res,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      false,
      null,
      null,
      err.message,
      null,
    );
  }
};

/* ----------------------------- DELETE ----------------------------------- */
donationCtaController.remove = async (req, res) => {
  try {
    await donationCtaService.deleteDonationCta(req.params.id);

    return responseHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      null,
      null,
      EN.DONATION_CTA_DELETED || "Donation CTA deleted successfully",
      null,
    );
  } catch (err) {
    return responseHelper.sendResponse(
      res,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      false,
      null,
      null,
      err.message,
      null,
    );
  }
};

module.exports = donationCtaController;
