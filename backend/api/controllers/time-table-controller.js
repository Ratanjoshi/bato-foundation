const timeTableService = require("../services/time-table-service");
const responseHelper = require("../../helpers/response-helper");
const logger = require("../../configs/logger");

const createTableHeader = async (req, res, next) => {
  try {
    const timeTable = await timeTableService.create(req);
    return responseHelper.sendResponse(
      res,
      timeTable.status,
      timeTable.success,
      timeTable.data,
      timeTable.errors,
      timeTable.message,
      timeTable.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const getTableHeader = async (req, res, next) => {
  try {
    const timeTable = await timeTableService.getTimeTable(req);
    return responseHelper.sendResponse(
      res,
      timeTable.status,
      timeTable.success,
      timeTable.data,
      timeTable.errors,
      timeTable.message,
      timeTable.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const updateHeaderAndTables = async (req, res, next) => {
  try {
    const timeTable = await timeTableService.updateHeaderAndTables(req);
    return responseHelper.sendResponse(
      res,
      timeTable.status,
      timeTable.success,
      timeTable.data,
      timeTable.errors,
      timeTable.message,
      timeTable.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const deleteTimeTableHeader = async (req, res, next) => {
  try {
    const timeTable = await timeTableService.deleteTimeTableHeader(req);
    return responseHelper.sendResponse(
      res,
      timeTable.status,
      timeTable.success,
      timeTable.data,
      timeTable.errors,
      timeTable.message,
      timeTable.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const updateTimeTableHeaderOnly = async (req, res, next) => {
  try {
    const timeTable = await timeTableService.updateTimeTableHeaderOnly(req);
    return responseHelper.sendResponse(
      res,
      timeTable.status,
      timeTable.success,
      timeTable.data,
      timeTable.errors,
      timeTable.message,
      timeTable.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

// Time Table
const createSingleTimeTable = async (req, res, next) => {
  try {
    const timeTable = await timeTableService.createSingleTimeTable(req);
    return responseHelper.sendResponse(
      res,
      timeTable.status,
      timeTable.success,
      timeTable.data,
      timeTable.errors,
      timeTable.message,
      timeTable.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};
const updateSingleTimeTable = async (req, res, next) => {
  try {
    const timeTable = await timeTableService.updateSingleTimeTable(req);
    return responseHelper.sendResponse(
      res,
      timeTable.status,
      timeTable.success,
      timeTable.data,
      timeTable.errors,
      timeTable.message,
      timeTable.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const deleteSingleTimeTable = async (req, res, next) => {
  try {
    const timeTable = await timeTableService.deleteSingleTimeTable(req);
    return responseHelper.sendResponse(
      res,
      timeTable.status,
      timeTable.success,
      timeTable.data,
      timeTable.errors,
      timeTable.message,
      timeTable.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

module.exports = {
  createTableHeader,
  getTableHeader,
  updateHeaderAndTables,
  deleteTimeTableHeader,
  updateTimeTableHeaderOnly,
  createSingleTimeTable,
  updateSingleTimeTable,
  deleteSingleTimeTable,
};
