const {
  departmentModel,
  Sequelize,
  employeeModel,
  clipArtModel,
  sequelize,
} = require("../../models");
const generalConstant = require("../../constants/general-constant");
const slugGenerator = require("../../utils/slugify");
const paginate = require("../../utils/paginate");
const { Op } = require("sequelize");

const create = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };
    req.body.slug = slugGenerator(req.body.name);

    // Check if the slug is already in use
    // const isUsedSlug = await departmentModel.findOne({
    //   where: { slug: req.body.slug },
    // });

    // if (isUsedSlug) {
    //   return {
    //     ...generalConstant.EN.DEPARTMENT.ALREADY_USED_NAME,
    //     data: null,
    //   };
    // }

    // Create department if slug is not used
    const department = await departmentModel.create(req.body);

    if (!department) {
      returnData = {
        ...generalConstant.EN.DEPARTMENT.DEPARTMENT_SAVE_FAILURE,
        data: null,
      };
    }
    returnData = {
      ...generalConstant.EN.DEPARTMENT.DEPARTMENT_SAVE_SUCCESS,
      data: department,
    };

    return returnData;
  } catch (error) {
    // Log or handle the error
    throw error;
  }
};

const getById = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };

    const department = await departmentModel.findByPk(+req.params.id, {
      include: [
        {
          model: employeeModel,
        },
        {
          model: clipArtModel,
        },
      ],
    });

    if (department) {
      returnData = {
        ...generalConstant.EN.DEPARTMENT.DEPARTMENT_VIEW_SUCCESS,
        data: department,
      };
    } else {
      returnData = {
        ...generalConstant.EN.DEPARTMENT.NOT_FOUND,
        data: null,
      };
    }

    return returnData;
  } catch (error) {
    // Log or handle the error
    throw error;
  }
};

const findAllDepartments = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };
    let { limit, page, slug } = req.query;
    const filters = {};
    const include = [];

    if (slug) {
      filters.slug = {
        [Op.like]: `%${slug}%`,
      };
    }

    const result = await paginate(departmentModel, {
      limit,
      page,
      filters,
      include,
    });
    if (result) {
      returnData = {
        ...generalConstant.EN.DEPARTMENT.DEPARTMENT_LIST_SUCCESS,
        data: result,
      };
    } else {
      returnData = {
        ...generalConstant.EN.DEPARTMENT.DEPARTMENT_LIST_FAILURE,
        data: null,
      };
    }
    return returnData;
  } catch (error) {
    throw error;
  }
};

const findAllDepartmentAndOneEmp = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };
    let { limit, page, slug } = req.query;

    const filters = {};
    const include = [];

    if (slug) {
      filters.slug = {
        [Op.like]: `%${slug}%`, // Partial match for slug
      };
      page = 1;
    }

    // Include logic for fetching one employee per department
    include.push({
      model: employeeModel,
      attributes: [
        "id",
        "initials",
        "slug",
        "emp_carousel_img",
        "emp_carousel_hov_img",
        "emp_quote_img_one",
        "designation",
        "emp_quote_img_two",
        "entered_date",
      ], // Specific employee attributes
      order: sequelize.literal("RAND()"), // Random employee
      required: true, // Exclude departments with no employees
    });

    // Fetch paginated data
    const result = await paginate(departmentModel, {
      limit,
      page,
      filters,
      include,
    });

    // Filter out departments without employees
    const filteredDepartments = result.data.filter(
      (department) => department.Employees && department.Employees.length > 0,
    );

    if (filteredDepartments.length > 0) {
      returnData = {
        ...generalConstant.EN.DEPARTMENT.DEPARTMENT_LIST_SUCCESS,
        data: {
          ...result,
          data: filteredDepartments, // Use only filtered departments
        },
      };
    } else {
      returnData = {
        ...generalConstant.EN.DEPARTMENT.DEPARTMENT_LIST_FAILURE,
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
    const department = await departmentModel.findByPk(+req.params.id);

    if (!department) {
      return {
        ...generalConstant.EN.DEPARTMENT.NOT_FOUND,
        data: null,
      };
    }
    req.body.slug = slugGenerator(req.body.name);

    const updatedDepartment = await department.update(req.body);

    if (!updatedDepartment) {
      return {
        ...generalConstant.EN.DEPARTMENT.DEPARTMENT_UPDATE_FAILURE,
        data: null,
      };
    } else {
      returnData = {
        ...generalConstant.EN.DEPARTMENT.DEPARTMENT_UPDATE_SUCCESS,
        data: updatedDepartment,
      };
    }
    return returnData;
  } catch (error) {
    throw error;
  }
};

const deleteDepartment = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };
    const department = await departmentModel.findByPk(+req.params.id, {
      include: [
        {
          model: employeeModel,
        },
      ],
    });

    if (!department) {
      return {
        ...generalConstant.EN.DEPARTMENT.NOT_FOUND,
        data: null,
      };
    }
    if (department.Employees?.length > 0) {
      return {
        ...generalConstant.EN.DEPARTMENT.DEPARTMENT_IS_IN_USE,
        data: null,
      };
    }

    await department.destroy();

    returnData = {
      ...generalConstant.EN.DEPARTMENT.DEPARTMENT_DELETE_SUCCESS,
      data: null,
    };
    return returnData;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getById,
  findAllDepartments,
  findAllDepartmentAndOneEmp,
  update,
  deleteDepartment,
};
