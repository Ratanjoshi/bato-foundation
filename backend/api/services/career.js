const {
  careerCategoryModel,
  careerModel,
  applicantModel,
} = require("../../models");
const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");

const list = async (req) => {
  try {
    const { page, limit, slug } = req.query;
    const filters = {
      is_published: true,
    };
    const include = [];

    if (slug) {
      include.push({
        model: careerCategoryModel,
        as: "category",
        where: {
          slug: {
            [Op.like]: `%${slug}%`,
          },
        },
        required: true,
      });
    }

    const career = await paginate(careerModel, {
      filters,
      include,
      page,
      limit,
    });

    if (!career) {
      return {
        ...generalConstant.EN.PORTFOLIO_CATEGORY.GET_PORTFOLIO_CATEGORY_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PORTFOLIO_CATEGORY.GET_PORTFOLIO_CATEGORY_SUCCESS,
      data: career,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const career = await careerModel.findByPk(+req.params.id);

    if (!career) {
      return {
        ...generalConstant.EN.PORTFOLIO_CATEGORY.PORTFOLIO_CATEGORY_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PORTFOLIO_CATEGORY.PORTFOLIO_CATEGORY_FOUND,
      data: career,
    };
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req) => {
  try {
    console.log("Hellerejpa9dfapdsf", req.params.slug);
    const career = await careerModel.findOne({
      where: { slug: req.params.slug },
    });

    if (!career) {
      return {
        ...generalConstant.EN.PORTFOLIO_CATEGORY.PORTFOLIO_CATEGORY_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PORTFOLIO_CATEGORY.PORTFOLIO_CATEGORY_FOUND,
      data: career,
    };
  } catch (error) {
    throw error;
  }
};

// admin api for career
const create = async (req) => {
  req.body.slug = slugGenerator(req.body.title);

  // checking if slug exists
  const careerExits = await careerModel.findOne({
    where: { slug: req.body.slug },
  });

  if (careerExits) {
    return { ...generalConstant.EN.CAREER.SLUG_EXISTS, data: null };
  }

  try {
    const isCategory = await careerCategoryModel.findByPk(req.body.categoryId);
    if (!isCategory) {
      return {
        ...generalConstant.EN.CAREER_CATEGORY.CAREER_CATEGORY_NOT_FOUND,
        data: null,
      };
    }

    const result = await careerModel.create(req.body);
    if (!result) {
      return {
        ...generalConstant.EN.CAREER.CREATE_CAREER_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.CAREER.CREATE_CAREER_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const listForAdmin = async (req) => {
  try {
    const { page, limit, slug } = req.query;
    const filters = {};
    const include = [];

    if (slug) {
      include.push({
        model: careerCategoryModel,
        as: "category",
        where: {
          slug: {
            [Op.like]: `%${slug}%`,
          },
        },
        required: true,
      });
    }

    const career = await paginate(careerModel, {
      filters,
      include,
      page,
      limit,
    });

    if (!career) {
      return {
        ...generalConstant.EN.PORTFOLIO_CATEGORY.GET_PORTFOLIO_CATEGORY_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PORTFOLIO_CATEGORY.GET_PORTFOLIO_CATEGORY_SUCCESS,
      data: career,
    };
  } catch (error) {
    throw error;
  }
};

// const listForAdmin = async (req) => {
//   try {
//     const { page, limit, slug } = req.query;
//     const filters = {};
//     const include = [];

//     if (slug) {
//       include.push({
//         model: careerCategoryModel,
//         where: {
//           slug: {
//             [Op.like]: `%${slug}%`,
//           },
//         },
//         required: true,
//       });
//     }

//     const career = await paginate(careerModel, {
//       filters,
//       include,
//       page,
//       limit,
//     });

//     if (!career) {
//       return {
//         ...generalConstant.EN.PORTFOLIO_CATEGORY.GET_PORTFOLIO_CATEGORY_FAILURE,
//         data: null,
//       };
//     }
//     return {
//       ...generalConstant.EN.PORTFOLIO_CATEGORY.GET_PORTFOLIO_CATEGORY_SUCCESS,
//       data: career,
//     };
//   } catch (error) {
//     throw error;
//   }
// };
// const getByIdAdmin = async (req) => {
//   try {
//     const career = await careerModel.findByPk(
//       +req.params.id,
//       (include = {
//         model: applicantModel,
//         as: "applicants",
//       }),
//     );

//     if (!career) {
//       return {
//         ...generalConstant.EN.CAREER.CAREER_FOUND,
//         data: null,
//       };
//     }

//     return {
//       ...generalConstant.EN.CAREER.CAREER_NOT_FOUND,
//       data: career,
//     };
//   } catch (error) {
//     throw error;
//   }
// };
const update = async (req) => {
  req.body.slug = slugGenerator(req.body.title);

  const careerExits = await careerModel.findByPk(req.params.id);

  if (!careerExits) {
    return {
      ...generalConstant.EN.CAREER.CAREER_NOT_FOUND,
      data: null,
    };
  }

  if (careerExits.slug !== req.body.slug) {
    const slugExists = await careerModel.findOne({
      where: { slug: req.body.slug },
    });
    if (slugExists) {
      return { ...generalConstant.EN.CAREER.SLUG_EXISTS, data: null };
    }
  }

  try {
    // const { id } = req.params;

    // const career = await careerModel.findByPk(id);
    // if (!career) {
    //   return {
    //     ...generalConstant.EN.CAREER.CAREER_NOT_FOUND,
    //     data: null,
    //   };
    // }

    const updated = await careerExits.update(req.body);

    return {
      ...generalConstant.EN.CAREER.UPDATE_CAREER_SUCCESS,
      data: updated,
    };
  } catch (error) {
    throw error;
  }
};

const remove = async (req) => {
  try {
    const { id } = req.params;
    const career = await careerModel.findByPk(id);
    if (!career) {
      return {
        ...generalConstant.EN.CAREER.CAREER_NOT_FOUND,
        data: null,
      };
    }

    await career.destroy();

    return {
      ...generalConstant.EN.CAREER.DELETE_CAREER_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  update,
  remove,
  getById,
  list,
  getBySlug,
  listForAdmin,
};
