const {
  departmentModel,
  employeeModel,
  timeTableHeaderModel,
  clipArtModel,
  timeTableModel,
  qnaModel,
} = require("../../models");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");
const { Op } = require("sequelize");

const create = async (req) => {
  try {
    const { departmentId } = req.body;

    // Check if the department exists
    const isDepartment = await departmentModel.findByPk(departmentId);
    if (!isDepartment) {
      return {
        ...generalConstant.EN.DEPARTMENT.NOT_FOUND,
        data: null,
      };
    }

    //if media linking needed then add here

    const create = await employeeModel.create(req.body);
    if (!create) {
      return {
        ...generalConstant.EN.EMPLOYEE.CREATE_EMPLOYEE_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.EMPLOYEE.CREATE_EMPLOYEE_SUCCESS,
      data: create,
    };
  } catch (error) {
    // Log or handle the error
    throw error;
  }
};

const getById = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };

    const employee = await employeeModel.findByPk(+req.params.id, {
      include: [
        {
          model: departmentModel,
          include: {
            model: clipArtModel,
          },
        },
        {
          model: timeTableHeaderModel,
          as: "timeTableHeader",
          include: {
            model: timeTableModel,
          },
        },
        {
          model: qnaModel,
          as: "qna",
        },
      ],
    });

    if (employee) {
      // Sorting timeTables by date manually (assuming the date format is hh:mm:ss)
      if (employee.timeTableHeader && employee.timeTableHeader.TimeTables) {
        employee.timeTableHeader.TimeTables.sort((a, b) => {
          // Convert time to Date objects for comparison
          const timeA = new Date(`1970-01-01T${a.date}Z`);
          const timeB = new Date(`1970-01-01T${b.date}Z`);
          return timeA - timeB; // Sort in ascending order
        });
      }

      returnData = {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_FOUND,
        data: employee,
      };
    } else {
      returnData = {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_NOT_FOUND,
        data: null,
      };
    }

    return returnData;
  } catch (error) {
    // Log or handle the error
    throw error;
  }
};

const findAllEmployee = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };
    let { limit, page, name, departmentId } = req.query;
    const filters = {};

    if (name) {
      filters.name = {
        [Op.name]: `%${name}%`,
      };
    }
    if (departmentId) {
      filters.departmentId = {
        [Op.like]: `%${departmentId}%`,
      };
    }
    const result = await paginate(employeeModel, {
      limit,
      page,
      filters,
      include: [
        {
          model: departmentModel,
          attributes: ["color"],
        },
      ],
    });
    if (result) {
      returnData = {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_LIST_SUCCESS,
        data: result,
      };
    } else {
      returnData = {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_LIST_FAILURE,
        data: null,
      };
    }
    return returnData;
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };
    const employee = await employeeModel.findByPk(+req.params.id);

    if (!employee) {
      return {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_NOT_FOUND,
        data: null,
      };
    }
    //if media linking needed then add here

    const updatedEmployee = await employee.update(req.body);

    if (!updatedEmployee) {
      return {
        ...generalConstant.EN.EMPLOYEE.UPDATE_EMPLOYEE_FAILURE,
        data: null,
      };
    } else {
      returnData = {
        ...generalConstant.EN.EMPLOYEE.UPDATE_EMPLOYEE_SUCCESS,
        data: updatedEmployee,
      };
    }
    return returnData;
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (req) => {
  try {
    const employee = await employeeModel.findByPk(+req.params.id, {
      include: [
        {
          model: timeTableHeaderModel,
          as: "timeTableHeader",
          include: {
            model: timeTableModel,
          },
        },
        {
          model: qnaModel,
          as: "qna",
        },
      ],
    });

    if (!employee) {
      return {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_NOT_FOUND,
        data: null,
      };
    }

    if (employee.qna?.length > 0) {
      await qnaModel.destroy({
        where: { employeeId: employee.id },
      });
    }

    const deleteEmp = await employee.destroy();

    if (!deleteEmp) {
      return {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_DELETE_FAILURE,
        data: null,
      };
    } else {
      return {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_DELETE_SUCCESS,
        data: null,
      };
    }
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };

    const employee = await employeeModel.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: departmentModel,
          include: {
            model: clipArtModel,
          },
        },
        {
          model: timeTableHeaderModel,
          as: "timeTableHeader",
          include: {
            model: timeTableModel,
          },
        },
        {
          model: qnaModel,
          as: "qna",
        },
      ],
    });

    if (employee) {
      // Sorting timeTables by date manually (assuming the date format is hh:mm:ss)
      if (employee.timeTableHeader && employee.timeTableHeader.TimeTables) {
        employee.timeTableHeader.TimeTables.sort((a, b) => {
          // Convert time to Date objects for comparison
          const timeA = new Date(`1970-01-01T${a.date}Z`);
          const timeB = new Date(`1970-01-01T${b.date}Z`);
          return timeA - timeB; // Sort in ascending order
        });
      }

      returnData = {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_FOUND,
        data: employee,
      };
    } else {
      returnData = {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_NOT_FOUND,
        data: null,
      };
    }

    return returnData;
  } catch (error) {
    // Log or handle the error
    throw error;
  }
};

const deleteMultipleEmployees = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return {
        ...generalConstant.EN.EMPLOYEE.INVALID_IDS,
        data: null,
      };
    }

    const employees = await employeeModel.findAll({
      where: { id: ids },
      include: [
        {
          model: departmentModel,
        },
      ],
    });

    if (employees.length === 0) {
      return {
        ...generalConstant.EN.EMPLOYEE.NOT_FOUND,
        data: null,
      };
    }

    // Check if any employee is associated with departments or other conditions
    const employeesInUse = employees.filter((employee) => employee.Department);

    if (employeesInUse.length > 0) {
      return {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_IN_USE,
        data: { employeesInUse },
      };
    }

    // Delete employees
    const deletedCount = await employeeModel.destroy({
      where: { id: ids },
    });

    returnData = {
      ...generalConstant.EN.EMPLOYEE.DELETE_SUCCESS,
      data: { deletedCount },
    };

    return returnData;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getById,
  findAllEmployee,
  update,
  deleteEmployee,
  getBySlug,
  deleteMultipleEmployees,
};
