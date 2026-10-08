const employeeService = require("../services/employee-service");
const responseHelper = require("../../helpers/response-helper");
const logger = require("../../configs/logger");

const createemployee = async (req, res, next) => {
  try {
    const employee = await employeeService.create(req);
    return responseHelper.sendResponse(
      res,
      employee.status,
      employee.success,
      employee.data,
      employee.errors,
      employee.message,
      employee.token,
    );
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const employee = await employeeService.getById(req);
    return responseHelper.sendResponse(
      res,
      employee?.status,
      employee.success,
      employee.data,
      employee.errors,
      employee.message,
      employee.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const employee = await employeeService.findAllEmployee(req);
    return responseHelper.sendResponse(
      res,
      employee.status,
      employee.success,
      employee.data,
      employee.errors,
      employee.message,
      employee.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const updatedemployee = async (req, res, next) => {
  try {
    const employee = await employeeService.update(req);
    return responseHelper.sendResponse(
      res,
      employee.status,
      employee.success,
      employee.data,
      employee.errors,
      employee.message,
      employee.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const deleteemployee = async (req, res, next) => {
  try {
    const employee = await employeeService.deleteEmployee(req);
    return responseHelper.sendResponse(
      res,
      employee.status,
      employee.success,
      employee.data,
      employee.errors,
      employee.message,
      employee.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const employee = await employeeService.getBySlug(req);
    return responseHelper.sendResponse(
      res,
      employee?.status,
      employee.success,
      employee.data,
      employee.errors,
      employee.message,
      employee.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const deleteMultipleEmployees = async (req, res, next) => {
  try {
    const response = await employeeService.deleteMultipleEmployees(req);
    return responseHelper.sendResponse(
      res,
      response.status,
      response.success,
      response.data,
      response.errors,
      response.message,
      response.token,
    );
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

module.exports = {
  createemployee,
  getById,
  list,
  updatedemployee,
  deleteemployee,
  getBySlug,
  deleteMultipleEmployees,
};
