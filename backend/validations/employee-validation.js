const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const {
  validateRequestBody,
  validateRequestParams,
} = require("../helpers/validator-helper");

const employeePostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    initials: joi.string().required().label("Initials"),
    slug: joi.string().required().label("Slug"),
    subDepartment: joi.string().required().label("Sub Department"),
    office_location: joi.string().required().label("Office Location"),
    entered_date: joi.date().required().label("Entered Date"),
    departmentId: joi.number().required().label("Department ID"),
    round_img: joi.string().required().label("Round Image"),
    web_view_img: joi.string().required().label("Web View Image"),
    mobile_view_img: joi.string().required().label("Mobile View Image"),
    emp_carousel_img: joi.string().required().label("Employee Image PNG"),
    emp_carousel_hov_img: joi.string().required().label("Employee Hover Image"),
    work_style_interview_image: joi
      .string()
      .required()
      .label("Work Style Interview Image Image"),
    emp_quote_img_one: joi
      .string()
      .required()
      .label("Employee Quote Image One"),
    emp_quote_img_two: joi
      .string()
      .required()
      .label("Employee Quote Image Two"),
    designation: joi.string().required().label("Designation"),
    message_img: joi.string().required().label("Message Image"),
    message_title: joi.string().required().label("Message Title"),
    message: joi.string().required().label("Message"),
  });
  const errors = await validateRequestBody(req, res, joiModel);
  if (!isEmpty(errors)) {
    return responseHelper.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      errors,
      messageConstant.EN.INPUT_ERROR,
      null,
    );
  }
  return next();
};

const employeePutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    initials: joi.string().optional().label("Initials"),
    slug: joi.string().optional().label("Slug"),
    subDepartment: joi.string().optional().label("Sub Department"),
    office_location: joi.string().optional().label("Office Location"),
    entered_date: joi.date().optional().label("Entered Date"),
    round_img: joi.string().optional().label("Round Image"),
    departmentId: joi.number().optional().label("Department ID"),
    web_view_img: joi.string().optional().label("Web View Image"),
    mobile_view_img: joi.string().optional().label("Mobile View Image"),
    emp_carousel_img: joi.string().optional().label("Employee Image PNG"),
    emp_carousel_hov_img: joi.string().optional().label("Employee Hover Image"),
    work_style_interview_image: joi
      .string()
      .optional()
      .label("Work style Interview Image"),
    emp_quote_img_one: joi
      .string()
      .optional()
      .label("Employee Quote Image One"),
    emp_quote_img_two: joi
      .string()
      .optional()
      .label("Employee Quote Image Two"),
    designation: joi.string().optional().label("Designation"),
    message_img: joi.string().optional().label("Message Image"),
    message_title: joi.string().optional().label("Message Title"),
    message: joi.string().optional().label("Message"),
  });
  const errors = await validateRequestBody(req, res, joiModel);
  if (!isEmpty(errors)) {
    return responseHelper.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      errors,
      messageConstant.EN.INPUT_ERROR,
      null,
    );
  }
  return next();
};

module.exports = {
  employeePostValidation,
  employeePutValidation,
};
