const httpStatus = require("http-status");

module.exports = {
  EN: {
    CREATED_SUCCESSFULLY: (moduleName) => ({
      status: 201,
      success: true,
      message: `${moduleName} Created Successfully`,
    }),
    CREATED_FAILED: (moduleName) => ({
      status: 500,
      success: false,
      message: `${moduleName} Creation Failed`,
    }),
    LIST_SUCCESSFULLY: (moduleName) => ({
      status: 200,
      success: true,
      message: `${moduleName} List Successful`,
    }),
    LIST_FAILED: (moduleName) => ({
      status: 500,
      success: false,
      message: `${moduleName} List Failed`,
    }),
    VIEW_SUCCESSFULLY: (moduleName) => ({
      status: 200,
      success: true,
      message: `${moduleName} View Successful`,
    }),
    VIEW_FAILED: (moduleName) => ({
      status: 500,
      success: false,
      message: `${moduleName} View Failed`,
    }),
    UPDATED_SUCCESSFULLY: (moduleName) => ({
      status: 200,
      success: true,
      message: `${moduleName} Updated Successfully`,
    }),
    UPDATE_FAILED: (moduleName) => ({
      status: 422,
      success: false,
      message: `${moduleName} Update Failed`,
    }),
    DELETED_SUCCESSFULLY: (moduleName) => ({
      status: 200,
      success: true,
      message: `${moduleName} Deleted Successfully`,
    }),
    DELETE_FAILED: (moduleName) => ({
      status: 500,
      success: false,
      message: `${moduleName} Delete Failed`,
    }),
    NOT_FOUND: (modelName) => ({
      status: httpStatus.NOT_FOUND,
      success: false,
      message: `${modelName} not Found.`,
    }),
    SERVER_ERROR: {
      status: httpStatus.SERVER_ERROR,
      success: false,
      message: "Something Went Wrong",
    },
  },
};
