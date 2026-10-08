const { socialModel, settingModel } = require("../../models");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");

// Create a new social entry
const createSocial = async (req) => {
  try {
    // Ensure the setting exists
    const setting = await settingModel.findByPk(+req.body?.settingId);
    if (!setting) {
      return {
        ...generalConstant.EN.SETTING.SETTING_NOT_FOUND,
        data: null,
      };
    }
    const newSocial = await socialModel.create({
      ...req.body,
    });

    if (!newSocial) {
      return {
        ...generalConstant.EN.SOCIAL.SOCIAL_CREATE_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SOCIAL.SOCIAL_CREATE_SUCCESS,
      data: newSocial,
    };
  } catch (error) {
    throw error;
  }
};

// Retrieve a social entry by ID
const getSocialById = async (req) => {
  try {
    const social = await socialModel.findByPk(+req.params.id);

    if (!social) {
      return {
        ...generalConstant.EN.SOCIAL.SOCIAL_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SOCIAL.SOCIAL_FOUND,
      data: social,
    };
  } catch (error) {
    throw error;
  }
};

const findAll = async (req) => {
  try {
    let { limit, page } = req.query;
    const result = await paginate(socialModel, {
      limit,
      page,
    });
    if (result) {
      return {
        ...generalConstant.EN.SOCIAL.SOCIAL_LIST_SUCCESS,
        data: result,
      };
    } else {
      return {
        ...generalConstant.EN.SOCIAL.SOCIAL_LIST_FAILURE,
        data: null,
      };
    }
  } catch (error) {
    throw error;
  }
};

// Update a social entry by ID
const updateSocialById = async (req) => {
  try {
    const social = await socialModel.findByPk(+req.params.id);
    if (!social) {
      return {
        ...generalConstant.EN.SOCIAL.SOCIAL_NOT_FOUND,
        data: null,
      };
    }

    // Update the Social entry
    const result = await social.update({
      ...req.body,
    });

    if (!result) {
      return {
        ...generalConstant.EN.SOCIAL.SOCIAL_UPDATE_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SOCIAL.SOCIAL_UPDATE_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

// Delete a social entry by ID
const deleteSocialById = async (req) => {
  try {
    const social = await socialModel.findByPk(+req.params.id);
    if (!social) {
      return {
        ...generalConstant.EN.SOCIAL.SOCIAL_NOT_FOUND,
        data: null,
      };
    }
    const result = await social.destroy();
    if (!result) {
      return {
        ...generalConstant.EN.SOCIAL.SOCIAL_DELETE_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SOCIAL.SOCIAL_DELETE_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSocial,
  getSocialById,
  updateSocialById,
  deleteSocialById,
  findAll,
};
