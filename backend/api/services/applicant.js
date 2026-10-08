const { careerModel, applicantModel } = require("../../models");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");
const { sendMail } = require("../../helpers/mailer/mailer");

// // public api for career
const applyCareer = async (req) => {
  try {
    console.log(req.body, "-------category----------");
    const isCareer = await careerModel.findByPk(+req.body.careerId);
    if (!isCareer) {
      return {
        ...generalConstant.EN.CAREER.CAREER_NOT_FOUND,
        data: null,
      };
    }
    const isAleadyApplied = await applicantModel.findOne({
      where: {
        careerId: +req.body.careerId,
        email: req.body.email,
      },
    });
    if (isAleadyApplied) {
      return {
        ...generalConstant.EN.APPLICANTS.ALREADY_APPLIED,
        data: null,
      };
    }
    const result = await applicantModel.create(req.body);
    const placeholders = {
      name: result.fullName,
      email: result.email,
      careerName: isCareer.title,
    };

    sendMail("jobApply", placeholders, result.email).catch((error) => {
      // Log the error without throwing it further
      console.error("Mail sending error:", error);
    });
    if (result) {
      return {
        ...generalConstant.EN.APPLICANTS.CREATE_APPLICANT_SUCCESS,
        data: null,
      };
    }
  } catch (error) {
    throw error;
  }
};

// for admin
const list = async (req) => {
  try {
    const { page, limit, careerId } = req.query;
    const filters = {};
    if (careerId) {
      filters.careerId = careerId;
    }
    const include = [
      {
        model: careerModel,
        as: "career",
        attributes: ["title"],
      },
    ];

    const applicants = await paginate(applicantModel, {
      filters,
      include,
      page,
      limit,
    });

    if (!applicants) {
      return {
        ...generalConstant.EN.APPLICANTS.APPLICANT_LIST_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.APPLICANTS.APPLICANT_LIST_SUCCESS,
      data: applicants,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const applicant = await applicantModel.findByPk(+req.params.id, {
      include: [
        {
          model: careerModel,
          as: "career",
          attributes: ["title"],
        },
      ],
    });

    if (!applicant) {
      return {
        ...generalConstant.EN.APPLICANTS.APPLICANT_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.APPLICANTS.APPLICANT_FOUND,
      data: applicant,
    };
  } catch (error) {
    throw error;
  }
};
// const update = async (req) => {
//   try {
//     const applicant = await applicant.findByPk(+req.params.id);

//     if (!applicant) {
//       return {
//         ...generalConstant.EN.APPLICANTS.APPLICANT_NOT_FOUND,
//         data: null,
//       };
//     }

//     await applicant.update(req.body);

//     return {
//       ...generalConstant.EN.APPLICANTS.UPDATE_APPLICANT_SUCCESS,
//       data: applicant,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

const updateStatus = async (req) => {
  try {
    console.log(req.params.id);
    const { status } = req.body;

    const applicant = await applicantModel.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: careerModel,
        as: "career",
        attributes: ["title"],
      },
    });

    if (!applicant) {
      return {
        ...generalConstant.EN.APPLICANTS.APPLICANT_NOT_FOUND,
        data: null,
      };
    }

    if (applicant.status === "selected") {
      return {
        ...generalConstant.EN.APPLICANTS.UPDATE_SELECTED_APPLICANT_FAILURE,
        data: null,
      };
    }
    await applicant.update({ status });

    const template = status === "selected" ? "cvSelected" : "cvUnSelected";

    const placeholders = {
      name: applicant.fullName,
      email: applicant.email,
      status,
      careerName: applicant.career?.title,
    };

    sendMail(template, placeholders, applicant.email).catch((error) => {
      console.error("Mail sending error:", error);
    });
    return {
      ...generalConstant.EN.APPLICANTS.UPDATE_APPLICANT_SUCCESS,
      data: applicant,
    };
  } catch (error) {
    throw error;
  }
};

const deleteApplicant = async (req) => {
  try {
    const applicant = await applicantModel.findByPk(+req.params.id);

    if (!applicant) {
      return {
        ...generalConstant.EN.APPLICANTS.APPLICANT_NOT_FOUND,
        data: null,
      };
    }

    await applicant.destroy();
    return {
      ...generalConstant.EN.APPLICANTS.DELETE_APPLICANT_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  applyCareer,
  // update,
  getById,
  list,
  updateStatus,
  deleteApplicant,
};
