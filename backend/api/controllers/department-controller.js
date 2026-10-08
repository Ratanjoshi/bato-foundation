const departmentService = require("../services/department-service");
const responseHelper = require("../../helpers/response-helper");
const logger = require("../../configs/logger");

const createDepartment = async (req, res, next) => {
  try {
    const createRole = await departmentService.create(req);
    return responseHelper.sendResponse(
      res,
      createRole.status,
      createRole.success,
      createRole.data,
      createRole.errors,
      createRole.message,
      createRole.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const department = await departmentService.getById(req);
    return responseHelper.sendResponse(
      res,
      department?.status,
      department.success,
      department.data,
      department.errors,
      department.message,
      department.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const department = await departmentService.findAllDepartments(req);
    return responseHelper.sendResponse(
      res,
      department.status,
      department.success,
      department.data,
      department.errors,
      department.message,
      department.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const findAllDepartmentAndOneEmp = async (req, res, next) => {
  try {
    const department = await departmentService.findAllDepartmentAndOneEmp(req);
    return responseHelper.sendResponse(
      res,
      department.status,
      department.success,
      department.data,
      department.errors,
      department.message,
      department.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const updatedDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.update(req);
    return responseHelper.sendResponse(
      res,
      department.status,
      department.success,
      department.data,
      department.errors,
      department.message,
      department.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.deleteDepartment(req);
    return responseHelper.sendResponse(
      res,
      department.status,
      department.success,
      department.data,
      department.errors,
      department.message,
      department.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

module.exports = {
  createDepartment,
  getById,
  list,
  updatedDepartment,
  deleteDepartment,
  findAllDepartmentAndOneEmp,
};
