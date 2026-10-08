const { qnaModel, employeeModel } = require("../../models");
const generalConstant = require("../../constants/general-constant");

const create = async (req) => {
  try {
    // Check if the slug is already in use
    const isEmployee = await employeeModel.findByPk(+req.body.employeeId);
    if (!isEmployee) {
      return {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_NOT_FOUND,
        data: null,
      };
    }

    const isUniquePositionNoInEmployee = await qnaModel.findOne({
      where: {
        employeeId: req.body.employeeId,
        qno: req.body.qno,
      },
    });
    if (isUniquePositionNoInEmployee) {
      return {
        ...generalConstant.EN.QNA.POSITION_NUMBER_ALREADY_EXISTS,
        data: null,
      };
    }

    // Create department if slug is not used
    const qna = await qnaModel.create(req.body);

    if (!qna) {
      return {
        ...generalConstant.EN.QNA.CREATE_QNA_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.QNA.CREATE_QNA_SUCCESS,
      data: qna,
    };
  } catch (error) {
    // Log or handle the error
    throw error;
  }
};

const update = async (req) => {
  try {
    let returnData = { ...generalConstant.EN.SERVER_ERROR };
    const isQna = await qnaModel.findByPk(+req.params.id);

    if (!isQna) {
      return {
        ...generalConstant.EN.QNA.QNA_NOT_FOUND,
        data: null,
      };
    }
    if (req.body.qno) {
      const isUniquePositionNoInEmployee = await qnaModel.findOne({
        where: {
          employeeId: isQna.employeeId,
          qno: req.body.qno,
        },
      });
      if (
        isUniquePositionNoInEmployee &&
        isUniquePositionNoInEmployee.id !== isQna.id
      ) {
        return {
          ...generalConstant.EN.QNA.POSITION_NUMBER_ALREADY_EXISTS,
          data: null,
        };
      }
    }
    const updatedQna = await isQna.update(req.body);

    if (!updatedQna) {
      return {
        ...generalConstant.EN.QNA.UPDATE_QNA_FAILURE,
        data: null,
      };
    } else {
      returnData = {
        ...generalConstant.EN.QNA.UPDATE_QNA_SUCCESS,
        data: updatedQna,
      };
    }
    return returnData;
  } catch (error) {
    throw error;
  }
};

const deleteQna = async (req) => {
  try {
    const isQna = await qnaModel.findByPk(+req.params.id);

    if (!isQna) {
      return {
        ...generalConstant.EN.QNA.QNA_NOT_FOUND,
        data: null,
      };
    }
    const deleted = await isQna.destroy();

    if (deleted) {
      return {
        ...generalConstant.EN.QNA.QNA_DELETE_SUCCESS,
        data: null,
      };
    } else {
      return {
        ...generalConstant.EN.QNA.QNA_DELETE_FAILURE,
        data: null,
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  deleteQna,
  update,
};
