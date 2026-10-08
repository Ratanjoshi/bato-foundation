const httpStatus = require("http-status");
const { TIME } = require("sequelize");
const { UPDATE, DELETE } = require("sequelize/lib/query-types");

module.exports = {
  EN: {
    SERVER_ERROR: {
      status: httpStatus.SERVER_ERROR,
      success: false,
      message: "Something Went Wrong",
    },
    ROLES: {
      ROLES_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Roles not found",
      },
      SUPERADMIN_CANNOT_UPDATE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Super Admin Cannot be updated",
      },
      ROLES_IS_IN_USE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Roles is used in other module",
      },
      ROLES_SAVE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Roles Created Successfully",
      },
      ROLES_SAVE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Roles Create Failure",
      },
      ROLES_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Roles List Success",
      },
      ROLES_LIST_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Roles List Failure",
      },
      ROLES_VIEW_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Roles View Success",
      },
      ROLES_VIEW_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Roles View Failure",
      },
      ROLES_EDIT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Roles Edit Success",
      },
      ROLES_EDIT_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Roles Edit Failure",
      },
      ROLES_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Roles Delete Success",
      },
      ROLES_DELETE_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Roles Delete Failure",
      },
    },
    ROLE_MENU: {
      ROLE_MENU_SAVE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Role Menu Created Successfully",
      },
      ROLE_MENU_SAVE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Role Menu Create Failure",
      },
      ROLE_MENU_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: false,
        message: "Role Menu List Success",
      },
      ROLE_MENU_LIST_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Role Menu List Failure",
      },
      ROLE_MENU_VIEW_SUCCESS: {
        status: httpStatus.OK,
        success: false,
        message: "Role Menu View Success",
      },
      ROLE_MENU_VIEW_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Role Menu View Failure",
      },
      ROLE_MENU_EDIT_SUCCESS: {
        status: httpStatus.OK,
        success: false,
        message: "Role Menu Edit Success",
      },
      ROLE_MENU_EDIT_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Role Menu Edit Failure",
      },
      ROLE_MENU_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: false,
        message: "Role Menu Delete Success",
      },
      ROLE_MENU_DELETE_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Role Menu Delete Failure",
      },
    },
    ACCESS_MODULE: {
      ACCESS_MODULE_LIST_SUCCESS: {
        message: "Access Module List Success",
        status: httpStatus.OK,
        success: true,
      },
      ROLE_MENU_ACTION_VIEW_SUCCESS: {
        message: "Role Menu Action View Success",
        success: true,
        status: httpStatus.OK,
      },
      ROLE_MENU_NOT_FOUND: {
        message: "Role Menu Not Found",
        success: false,
        status: httpStatus.NOT_FOUND,
      },
      ACCESS_MODULE_LIST_FAILURE: {
        message: "Access Module List Failure",
        success: false,
        status: httpStatus.NOT_FOUND,
      },
      ACCESS_MODULE_VIEW_SUCCESS: {
        message: "Access Module View Success",
        success: true,
        status: httpStatus.OK,
      },
      ACCESS_MODULE_VIEW_FAILURE: {
        message: "Access Module View Failure",
        success: false,
        status: httpStatus.NOT_FOUND,
      },
      ACCESS_MODULE_NOT_FOUND: {
        message: "Access Module Not Found",
        success: false,
        status: httpStatus.NOT_FOUND,
      },
    },
    USERS: {
      MODEL_COUNT_SUCCESS: {
        message: "Model Count Success",
        success: true,
        status: httpStatus.OK,
      },
      MODEL_COUNT_FAILURE: {
        message: "Model Count Failure",
        success: false,
        status: httpStatus.NOT_ACCEPTABLE,
      },
      CREATE_USER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "User Created Successfully",
      },
      UPDATE_USER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "User Updated Successfully",
      },
      USER_IS_DELETED: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "User is deleted",
      },
      USER_NOT_ACTIVE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "User is not active",
      },
      UPDATE_USER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "User Update Failure",
      },
      CREATE_USER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "User Create Failure",
      },
      USER_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "User List Success",
      },
      USER_LIST_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "User List Failure",
      },
      PASSWORD_CHANGE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Password Changed Successfully",
      },
      PASSWORD_CHANGE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Password Change Failure",
      },
      PASSWORD_RESET_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Password Reset Successfully",
      },
      PASSWORD_RESET_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Password Reset Failure",
      },
      User_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "User not found",
      },
      USER_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "User Found",
      },
      LOGIN_FAILURE: {
        message: "User Login Failure",
        status: httpStatus.BAD_REQUEST,
        success: false,
      },
      LOGIN_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "User Login Successfully",
      },
      LOGOUT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "User Logout Successfully",
      },
      LOGOUT_FAILURE: {
        message: "User Logout Failure",
        status: httpStatus.BAD_REQUEST,
        success: false,
      },
      DELETE_USER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "User Deleted Successfully",
      },
      ACTIVE_USER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Active User Successfully",
      },
      UN_ACTIVE_USER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "InActive User Successfully",
      },
      UN_DELETE_USER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "User unDeleted Successfully",
      },
      DELETE_USER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "User Delete Failure",
      },
      ACTIVE_USER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "User Active Toggle Failure",
      },
    },
    DEPARTMENT: {
      DEPARTMENT_IS_IN_USE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Department is used in employee",
      },
      ALREADY_USED_NAME: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "This name is already in used",
      },
      DEPARTMENT_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Department List Success",
      },
      DEPARTMENT_LIST_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Department List Failure",
      },
      DEPARTMENT_VIEW_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Department View Success",
      },
      DEPARTMENT_VIEW_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Department View Failure",
      },
      DEPARTMENT_SAVE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Department Created Successfully",
      },
      DEPARTMENT_SAVE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Department Create Failure",
      },
      DEPARTMENT_UPDATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Department Updated Successfully",
      },
      DEPARTMENT_UPDATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Department Update Failure",
      },
      DEPARTMENT_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Department Deleted Successfully",
      },
      DEPARTMENT_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Department Delete Failure",
      },
      NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Department Not Found",
      },
    },
    EMPLOYEE: {
      CREATE_EMPLOYEE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Employee Created Successfully",
      },
      CREATE_EMPLOYEE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Employee Not Created",
      },
      EMPLOYEE_IS_USED_IN_OTHER_MODULE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Cannot delete: Employee is used in other module",
      },
      UPDATE_EMPLOYEE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Employee Updated Successfully",
      },
      UPDATE_EMPLOYEE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Employee Not Updated",
      },
      EMPLOYEE_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Employee Not Found",
      },
      EMPLOYEE_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Employee Found",
      },
      EMPLOYEE_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Employee List ",
      },
      EMPLOYEE_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Employee List Failure ",
      },
      EMPLOYEE_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Employee Deleted Successfully",
      },
      EMPLOYEE_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Employee Delete Failure",
      },
    },
    CLIPART: {
      POSITION_NUMBER_ALREADY_EXISTS: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Position Number Already Exists",
      },
      CREATE_CLIPART_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "ClipArt Created Successfully",
      },
      CREATE_CLIPART_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "ClipArt Not Created",
      },
      UPDATE_CLIPART_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "ClipArt Updated Successfully",
      },
      UPDATE_CLIPART_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "ClipArt Not Updated",
      },
      CLIPART_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "ClipArt Not Found",
      },
      CLIPART_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "ClipArt Found",
      },
      CLIPART_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "ClipArt List ",
      },
      CLIPART_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "ClipArt List Failure ",
      },
      CLIPART_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "ClipArt Deleted Successfully",
      },
      CLIPART_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "ClipArt Delete Failure",
      },
    },
    ACTION_REQUEST: {
      APPROVE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Action Request Approved Successfully",
      },
      APPROVE_REJECTED: {
        status: httpStatus.OK,
        success: true,
        message: "Action Request Rejected Successfully",
      },
      ACTION_FAILURE: {
        status: httpStatus.BAD_REQUEST,
        success: false,
        message: "Action Request Failed",
      },
      ACTION_ALREADY_PROCESSED: {
        status: httpStatus.BAD_REQUEST,
        success: false,
        message: "Action request has already been processed",
      },
      NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Action Request Not Found",
      },
    },
    QNA: {
      POSITION_NUMBER_ALREADY_EXISTS: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Position Number Already Exists",
      },
      CREATE_QNA_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Qna Created Successfully",
      },
      CREATE_QNA_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Qna Not Created",
      },
      UPDATE_QNA_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Qna Updated Successfully",
      },
      UPDATE_QNA_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Qna Not Updated",
      },
      QNA_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Qna Not Found",
      },
      QNA_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Qna Found",
      },
      QNA_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Qna List ",
      },
      QNA_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Qna List Failure ",
      },
      QNA_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Qna Deleted Successfully",
      },
      QNA_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Qna Delete Failure",
      },
    },
    TIME_TABLE_HEADER: {
      CREATE_TIME_TABLE_HEADER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Time Table Header Created Successfully",
      },
      DUPLICATE_POSITION_FOUND: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Duplicate Position Found",
      },
      CREATE_TIME_TABLE_HEADER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Time Table Header Not Created",
      },
      UPDATE_TIME_TABLE_HEADER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Time Table Header Updated Successfully",
      },
      UPDATE_TIME_TABLE_HEADER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Time Table Header Not Updated",
      },
      TIME_TABLE_HEADER_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Time Table Header Not Found",
      },
      TIME_TABLE_HEADER_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Time Table Header Found",
      },
      TIME_TABLE_HEADER_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Time Table Header List ",
      },
      TIME_TABLE_HEADER_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Time Table Header List Failure ",
      },
      TIME_TABLE_HEADER_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Time Table Header Deleted Successfully",
      },
      TIME_TABLE_HEADER_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Time Table Header Delete Failure",
      },
      TIME_TABLE_HEADER_IS_IN_USE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Time Table Header is used in time table",
      },
    },
    TIME_TABLE: {
      CREATE_TIME_TABLE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Time Table Created Successfully",
      },
      POSITION_ALREADY_EXISTS: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Position Already Exists",
      },
      CREATE_TIME_TABLE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Time Table Not Created",
      },
      UPDATE_TIME_TABLE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Time Table Updated Successfully",
      },
      UPDATE_TIME_TABLE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Time Table Not Updated",
      },
      TIME_TABLE_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Time Table Not Found",
      },
      TIME_TABLE_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Time Table Found",
      },
      TIME_TABLE_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Time Table List ",
      },
      TIME_TABLE_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Time Table List Failure ",
      },
      TIME_TABLE_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Time Table Deleted Successfully",
      },
      TIME_TABLE_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Time Table Delete Failure",
      },
    },
    MEDIA_CATEGORY: {
      CREATE_MEDIA_CATEGORY_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Media Category Created Successfully",
      },
      CREATE_MEDIA_CATEGORY_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Media Category Not Created",
      },
      UPDATE_MEDIA_CATEGORY_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Media Category Updated Successfully",
      },
      UPDATE_MEDIA_CATEGORY_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Media Category Not Updated",
      },
      MEDIA_CATEGORY_IN_USED: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Media Category is used in media",
      },
      MEDIA_CATEGORY_NAME_ALREADY_USED: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Media Category Name Already Used",
      },
      MEDIA_CATEGORY_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Media Category Not Found",
      },
      MEDIA_CATEGORY_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Media Category Found",
      },
      MEDIA_CATEGORY_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Media Category List ",
      },
      MEDIA_CATEGORY_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Media Category List Failure ",
      },
      MEDIA_CATEGORY_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Media Category Deleted Successfully",
      },
      MEDIA_CATEGORY_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Media Category Delete Failure",
      },
    },
    MEDIA: {
      CREATE_MEDIA_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Media Created Successfully",
      },
      CREATE_MEDIA_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Media Not Created",
      },
      UPDATE_MEDIA_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Media Updated Successfully",
      },
      UPDATE_MEDIA_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Media Not Updated",
      },
      MEDIA_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Media Not Found",
      },
      MEDIA_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Media Found",
      },
      MEDIA_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Media List ",
      },
      MEDIA_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Media List Failure ",
      },
      MEDIA_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Media Deleted Successfully",
      },
      MEDIA_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Media Delete Failure",
      },
      MEDIA_IN_USED: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Media is used in other module",
      },
      NO_FILE_UPLOADED: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "No file uploaded",
      },
    },

    SEO: {
      CREATE_SEO_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "SEO Created Successfully",
      },
      CREATE_SEO_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "SEO Not Created",
      },
      UPDATE_SEO_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "SEO Updated Successfully",
      },
      UPDATE_SEO_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "SEO Not Updated",
      },
      SEO_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "SEO Not Found",
      },
      SEO_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "SEO Found",
      },
      SEO_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "SEO List ",
      },
      SEO_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "SEO List Failure ",
      },
      SEO_GET_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "SEO Get Successfully",
      },
      SEO_GET_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "SEO Get Failure",
      },
      SEO_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "SEO Deleted Successfully",
      },
      SEO_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "SEO Delete Failure",
      },
    },
    SETTING: {
      SETTING_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Setting not found",
      },
      SETTING_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Setting Found",
      },
      SETTING_UPDATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Setting Updated Successfully",
      },
      SETTING_UPDATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Setting Update Failure",
      },
    },
    SOCIAL: {
      SOCIAL_CREATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Social Created Successfully",
      },
      SOCIAL_CREATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Social Not Created",
      },
      SOCIAL_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Social List Success",
      },
      SOCIAL_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Social List Failure",
      },
      SOCIAL_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Social not found",
      },
      SOCIAL_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Social Found",
      },
      SOCIAL_UPDATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Social Updated Successfully",
      },
      SOCIAL_UPDATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Social Update Failure",
      },
      SOCIAL_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Social Deleted Successfully",
      },
      SOCIAL_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Social Delete Failure",
      },
    },
    FAQ: {
      CREATE_FAQ_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "FAQ Created Successfully",
      },
      CREATE_FAQ_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "FAQ Not Created",
      },
      UPDATE_FAQ_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "FAQ Updated Successfully",
      },
      UPDATE_FAQ_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "FAQ Not Updated",
      },
      FAQ_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "FAQ Not Found",
      },
      FAQ_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "FAQ Found",
      },
      FAQ_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "FAQ List ",
      },
      FAQ_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "FAQ List Failure ",
      },
      FAQ_GET_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "FAQ Get Successfully",
      },
      FAQ_GET_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "FAQ Get Failure",
      },
      FAQ_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "FAQ Deleted Successfully",
      },
      FAQ_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "FAQ Delete Failure",
      },
    },
    NOTIFICATION: {
      CREATE_NOTIFICATION_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Notification Created Successfully",
      },
      CREATE_NOTIFICATION_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Notification Not Created",
      },
      NOTIFICATION_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Notification not found",
      },
      NOTIFICATION_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Notification Found",
      },
      NOTIFICATION_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Notification List ",
      },
      NOTIFICATION_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Notification List Failure ",
      },
      NOTIFICATION_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Notification Deleted Successfully",
      },
      NOTIFICATION_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Notification Delete Failure",
      },
      NOTIFICATION_ALREADY_READ: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Notification Already Read",
      },
    },
    PAGES: {
      CREATE_PAGES_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Pages Created Succesfully",
      },

      CREATE_PAGES_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Pages Not Created ",
      },

      CREATE_PAGES_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Pages Not Created ",
      },

      PAGES_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Pages Not Found",
      },
      PAGES_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Pages Found",
      },
      PAGES_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Pages List",
      },
      PAGES_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Pages List Failure",
      },

      PAGES_UPDATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Pages Updated Successfully",
      },

      PAGES_UPDATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Pages Update Failure",
      },
      PAGES_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Pages Deleted Successfully",
      },
      PAGES_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Pages Delete Failure",
      },
    },

    BANNER: {
      CREATE_BANNER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Banner Created Successfully",
      },
      CREATE_BANNER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Banner Not Created",
      },
      UPDATE_BANNER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Banner Updated Successfully",
      },
      UPDATE_BANNER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Banner Not Updated",
      },
      BANNER_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Banner Not Found",
      },
      BANNER_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Banner Found",
      },
      BANNER_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Banner List ",
      },
      BANNER_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Banner List Failure ",
      },
      BANNER_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Banner Deleted Successfully",
      },
      BANNER_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Banner Delete Failure",
      },
    },
    BANNER_ITEM: {
      CREATE_BANNER_ITEM_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Banner Item Created Successfully",
      },
      CREATE_BANNER_ITEM_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Banner Item Not Created",
      },
      UPDATE_BANNER_ITEM_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Banner Item Updated Successfully",
      },
      UPDATE_BANNER_ITEM_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Banner Item Not Updated",
      },
      BANNER_ITEM_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Banner Item Not Found",
      },
      BANNER_ITEM_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Banner Item Found",
      },
      BANNER_ITEM_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Banner Item List ",
      },
      BANNER_ITEM_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Banner Item List Failure ",
      },
      BANNER_ITEM_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Banner Item Deleted Successfully",
      },
      BANNER_ITEM_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
      },
    },

    PORTFOLIO_CATEGORY: {
      CREATE_PORTFOLIO_CATEGORY_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Category Created Successfully",
      },
      CREATE_PORTFOLIO_CATEGORY_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio Category Create Failure",
      },
      PORTFOLIO_CATEGORY_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Portfolio Category Not Found",
      },
      GET_PORTFOLIO_CATEGORY_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Category List",
      },
      GET_PORTFOLIO_CATEGORY_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio Category List Failure",
      },
      PORTFOLIO_CATEGORY_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Category Found",
      },
      UPDATE_PORTFOLIO_CATEGORY_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Category Updated Successfully",
      },
      UPDATE_PORTFOLIO_CATEGORY_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio Category Update Failure",
      },
      DELETE_PORTFOLIO_CATEGORY_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Category Deleted Successfully",
      },
      DELETE_PORTFOLIO_CATEGORY_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio Category Delete Failure",
      },
    },

    PORTFOLIO: {
      CREATE_PORTFOLIO_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Created Successfully",
      },
      CREATE_PORTFOLIO_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio Create Failure",
      },
      PORTFOLIO_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Portfolio Not Found",
      },
      SLUG_EXISTS: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Slug already exists",
      },
      PORTFOLIO_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Found",
      },
      UPDATE_PORTFOLIO_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Updated Successfully",
      },
      UPDATE_PORTFOLIO_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio Update Failure",
      },
      DELETE_PORTFOLIO_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Deleted Successfully",
      },
      DELETE_PORTFOLIO_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio Delete Failure",
      },
    },

    PORTFOLIO_MEDIA: {
      CREATE_PORTFOLIO_MEDIA_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Media Created Successfully",
      },
      CREATE_PORTFOLIO_MEDIA_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio Media Create Failure",
      },
      PORTFOLIO_MEDIA_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Portfolio Media Not Found",
      },
      UPDATE_PORTFOLIO_MEDIA_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Media Updated Successfully",
      },
      UPDATE_PORTFOLIO_MEDIA_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio Media Update Failure",
      },
      DELETE_PORTFOLIO_MEDIA_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio Media Deleted Successfully",
      },
      DELETE_PORTFOLIO_MEDIA_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio Media Delete Failure",
      },
    },
    PORTFOLIO_SUBIMAGE: {
      CREATE_PORTFOLIO_SUBIMAGE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio SubImage Created Successfully",
      },
      CREATE_PORTFOLIO_SUBIMAGE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio SubImage Create Failure",
      },
      PORTFOLIO_SUBIMAGE_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Portfolio SubImage Not Found",
      },
      UPDATE_PORTFOLIO_SUBIMAGE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio SubImage Updated Successfully",
      },
      UPDATE_PORTFOLIO_SUBIMAGE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio SubImage Update Failure",
      },
      DELETE_PORTFOLIO_SUBIMAGE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Portfolio SubImage Deleted Successfully",
      },
      DELETE_PORTFOLIO_SUBIMAGE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Portfolio SubImage Delete Failure",
      },
    },

    SERVICE: {
      CREATE_SERVICE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Service Created Successfully",
      },
      CREATE_SERVICE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Service Create Failure",
      },
      SERVICE_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Service list fetched Successfully",
      },

      SERVICE_LIST_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Service list Failure",
      },
      SLUG_EXISTS: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Slug already exists",
      },

      SERVICE_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Service Not Found",
      },
      SERVICE_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Service Found",
      },
      UPDATE_SERVICE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Service Updated Successfully",
      },
      UPDATE_SERVICE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Service Update Failure",
      },
      DELETE_SERVICE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Service Deleted Successfully",
      },
      DELETE_SERVICE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Service Delete Failure",
      },
    },
    TECHNOLOGY_STACK: {
      TECHNOLOGY_STACK_CREATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Technology stack created successfully",
      },
      TECHNOLOGY_STACK_CREATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Technology stack creation failed",
      },
      TECHNOLOGY_STACK_LIST_SUCCESS: {
        status: httpStatus.FOUND,
        success: true,
        message: "Technology stack list found",
      },
      TECHNOLOGY_STACK_LIST_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: true,
        message: "Technology stack list not found",
      },
      TECHNOLOGY_STACK_GET_SUCCESS: {
        status: httpStatus.FOUND,
        success: true,
        message: "Technology stack found",
      },
      TECHNOLOGY_STACK_GET_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: true,
        message: "Technology stack not found",
      },
      TECHNOLOGY_STACK_UPDATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Technology stack updated successfully",
      },
      TECHNOLOGY_STACK_UPDATE_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: true,
        message: "Technology stack not found",
      },
      TECHNOLOGY_STACK_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Technology stack deleted successfully",
      },
      TECHNOLOGY_STACK_DELETE_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: true,
        message: "Technology stack not found",
      },
    },

    TECHNOLOGY: {
      TECHNOLOGY_CREATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Technology created successfully",
      },
      TECHNOLOGY_CREATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Technology creation failure",
      },
      TECHNOLOGY_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Technology list Found",
      },
      TECHNOLOGY_LIST_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: true,
        message: "Technology list not found",
      },
      TECHNOLOGY_GET_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Technology found",
      },
      TECHNOLOGY_GET_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: true,
        message: "Technology not found",
      },
      TECHNOLOGY_UPDATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Technology updated successfully",
      },
      TECHNOLOGY_UPDATE_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: true,
        message: "Technology not found",
      },
      TECHNOLOGY_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Technology deleted successfully",
      },
      TECHNOLOGY_DELETE_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: true,
        message: "Technology not found",
      },
    },
    SERVICE_USED_CASES: {
      CREATE_SERVICE_USED_CASES_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Service used cases created successfully",
      },
      CREATE_SERVICE_USED_CASES_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Service used cases creation failure",
      },
      SERVICE_USED_CASES_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: false,
        message: "Service used cases list created Successfully",
      },

      SERVICE_USED_CASES_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Service used cases list Failure",
      },
      SERVICE_USED_CASES_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Service used cases Not Found",
      },
      SERVICE_USED_CASES_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Service used cases Found",
      },
      UPDATE_SERVICE_USED_CASES_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Service used cases Updated Successfully",
      },
      UPDATE_SERVICE_USED_CASES_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Service used cases Update Failure",
      },
      DELETE_SERVICE_USED_CASES_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Service used cases Deleted Successfully",
      },
      DELETE_SERVICE_USED_CASES_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Service used cases Delete Failure",
      },
    },

    PROJECT_REQUIREMENT: {
      CREATE_PROJECT_REQUIREMENT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Project requirement created successfully",
      },
      CREATE_PROJECT_REQUIREMENT_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Project requirement creation failure",
      },
      PROJECT_REQUIREMENT_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: false,
        message: "Project requirement list created Successfully",
      },

      PROJECT_REQUIREMENT_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Project requirement list Failure",
      },
      PROJECT_REQUIREMENT_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Project requirement Not Found",
      },
      PROJECT_REQUIREMENT_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Project requirement Found",
      },
      UPDATE_PROJECT_REQUIREMENT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Project requirement Updated Successfully",
      },
      UPDATE_PROJECT_REQUIREMENT_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Project requirement Update Failure",
      },
      DELETE_PROJECT_REQUIREMENT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Project requirement Deleted Successfully",
      },
      DELETE_PROJECT_REQUIREMENT_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Project requirement Delete Failure",
      },
    },
    REQUIREMENTS: {
      CREATE_REQUIREMENTS_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Requirements created successfully",
      },
      CREATE_REQUIREMENTS_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Requirements creation failure",
      },
      REQUIREMENTS_SUCCESS: {
        status: httpStatus.OK,
        success: false,
        message: "Requirements list created Successfully",
      },

      REQUIREMENTS_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Requirements list Failure",
      },
      REQUIREMENTS_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Requirements Not Found",
      },
      REQUIREMENTS_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Requirements Found",
      },
      UPDATE_REQUIREMENTS_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Requirements Updated Successfully",
      },
      UPDATE_REQUIREMENTS_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Requirements Update Failure",
      },
      DELETE_REQUIREMENTS_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Requirements Deleted Successfully",
      },
      DELETE_REQUIREMENTS_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Requirements Delete Failure",
      },
    },
    TESTIMONIALS: {
      CREATE_TESTIMONIAL_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Testimonial created successfully",
      },
      CREATE_TESTIMONIAL_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Testimonial creation failure",
      },
      TESTIMONIAL_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Testimonial list created Successfully",
      },

      TESTIMONIAL_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Testimonial list Failure",
      },
      TESTIMONIAL_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Testimonial Not Found",
      },
      TESTIMONIAL_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Testimonial Found",
      },
      UPDATE_TESTIMONIAL_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Testimonial Updated Successfully",
      },
      UPDATE_TESTIMONIAL_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Testimonial Update Failure",
      },
      DELETE_TESTIMONIAL_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Testimonial Deleted Successfully",
      },
      DELETE_TESTIMONIAL_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Testimonial Delete Failure",
      },
    },
    CONTACT: {
      CREATE_CONTACT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Contact created successfully",
      },
      CREATE_CONTACT_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Contact creation failure",
      },
      CONTACT_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Contact list created Successfully",
      },

      CONTACT_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Contact list Failure",
      },
      CONTACT_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Contact Not Found",
      },
      CONTACT_FOUND: {
        status: httpStatus.FOUND,
        success: true,
        message: "Contact Found",
      },
      UPDATE_CONTACT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Contact Updated Successfully",
      },
      UPDATE_CONTACT_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Contact Update Failure",
      },
      DELETE_CONTACT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Contact Deleted Successfully",
      },
      DELETE_CONTACT_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Contact Delete Failure",
      },
    },
    SUBSCRIPTION: {
      CREATE_SUBSCRIPTION_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Subscribtion created successfully",
      },
      CREATE_SUBSCRIPTION_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Subscribtion  creation failure",
      },
      SUBSCRIPTION_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Subscribtion  list created Successfully",
      },

      SUBSCRIPTION_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Subscribtion list Failure",
      },
      SUBSCRIPTION_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Subscribtion Not Found",
      },
      SUBSCRIPTION_FOUND: {
        status: httpStatus.FOUND,
        success: true,
        message: "Subscribtion Found",
      },
      UPDATE_SUBSCRIPTION_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Subscribtion Updated Successfully",
      },
      UPDATE_SUBSCRIPTION_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Subscribtion Update Failure",
      },
      DELETE_SUBSCRIPTION_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Subscribtion Deleted Successfully",
      },
      DELETE_SUBSCRIPTION_FAILURE: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Subscribtion Delete Failure",
      },
    },
    EMAIL_TEMPLATE: {
      CREATE_EMAIL_TEMPLATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Email Template Created Successfully",
      },
      EMAIL_TEMPLATE_USED_IN: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Email Template Already Used In Active Template",
      },
      CREATE_EMAIL_TEMPLATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Email Template Not Created",
      },
      UPDATE_EMAIL_TEMPLATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Email Template Updated Successfully",
      },
      UPDATE_EMAIL_TEMPLATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Email Template Not Updated",
      },
      EMAIL_TEMPLATE_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Email Template Not Found",
      },
      EMAIL_TEMPLATE_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Email Template Found",
      },
      EMAIL_TEMPLATE_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Email Template List Success",
      },
      EMAIL_TEMPLATE_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Email Template List Failure ",
      },
      EMAIL_TEMPLATE_GET_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Email Template Get Successfully",
      },
      EMAIL_TEMPLATE_GET_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Email Template Get Failure",
      },
      EMAIL_TEMPLATE_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Email Template Deleted Successfully",
      },
      EMAIL_TEMPLATE_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Email Template Delete Failure",
      },
    },
    ACTIVE_EMAIL_TEMPLATE: {
      REQUIRED_AT_LEAST_ONE_ACTIVE_TEMPLATE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Activate Another Email Template Before Undoing This",
      },
      CREATE_ACTIVE_EMAIL_TEMPLATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Email Template Assigned Successfully",
      },
      CREATE_ACTIVE_EMAIL_TEMPLATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Active Email Template Not Created",
      },
      UPDATE_ACTIVE_EMAIL_TEMPLATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Active Email Template Updated Successfully",
      },
      UPDATE_ACTIVE_EMAIL_TEMPLATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Active Email Template Not Updated",
      },
      ACTIVE_EMAIL_TEMPLATE_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Active Email Template Not Found",
      },
      ACTIVE_EMAIL_TEMPLATE_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Active Email Template Found",
      },
      ACTIVE_EMAIL_TEMPLATE_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Active Email Template List ",
      },
      ACTIVE_EMAIL_TEMPLATE_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Active Email Template List Failure ",
      },
      ACTIVE_EMAIL_TEMPLATE_GET_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Active Email Template Get Successfully",
      },
      ACTIVE_EMAIL_TEMPLATE_GET_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Active Email Template Get Failure",
      },
      ACTIVE_EMAIL_TEMPLATE_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Active Email Template Deleted Successfully",
      },
      ACTIVE_EMAIL_TEMPLATE_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Active Email Template Delete Failure",
      },
    },
    SMTP: {
      CREATE_SMTP_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Active Email Template Created Successfully",
      },
      ALREADY_HAS_ONE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "SMTP data already exists.",
      },
      CREATE_SMTP_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Active Email Template Not Created",
      },
      UPDATE_SMTP_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Active Email Template Updated Successfully",
      },
      UPDATE_SMTP_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Active Email Template Not Updated",
      },
      SMTP_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Active Email Template Not Found",
      },
      SMTP_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Active Email Template Found",
      },
      SMTP_GET_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Active Email Template Get Successfully",
      },
      SMTP_GET_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Active Email Template Get Failure",
      },
    },
    BLOG_CATEGORY: {
      CREATE_BLOG_CATEGORY_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Blog Category Created Successfully",
      },
      CREATE_BLOG_CATEGORY_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Blog Category Not Created ",
      },
      BLOG_CATEGORY_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog Category Not Found",
      },
      BLOG_CATEGORY_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Blog Category Found",
      },
      BLOG_CATEGORY_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Blog Category List Success",
      },
      BLOG_CATEGORY_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Blog Category List Failure",
      },

      BLOG_CATEGORY_UPDATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Blog Category Updated Successfully",
      },

      BLOG_CATEGORY_UPDATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Blog Category Update Failure",
      },
      BLOG_CATEGORY_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Blog Category Deleted Successfully",
      },
      BLOG_CATEGORY_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Blog Category Delete Failure",
      },
    },
    BLOG: {
      CREATE_BLOG_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Blog Created Successfully",
      },
      CREATE_BLOG_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Blog Not Created ",
      },
      BLOG_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Blog Not Found",
      },
      BLOG_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Blog Found",
      },
      BLOG_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Blog List Success",
      },
      BLOG_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Blog List Failure",
      },

      BLOG_UPDATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Blog Updated Successfully",
      },

      BLOG_UPDATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Blog Update Failure",
      },
      BLOG_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Blog Deleted Successfully",
      },
      BLOG_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Blog Delete Failure",
      },
    },
    SUBSCRIBERS: {
      CREATE_SUBSCRIBERS_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Subscribers List Created Successfully",
      },

      CREATE_SUBSCRIBERS_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Subscribers Not Created ",
      },

      CREATE_SUBSCRIBERS_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Subscribers Not Created ",
      },

      SUBSCRIBERS_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Subscribers Not Found",
      },
      SUBSCRIBERS_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Subscribers Found",
      },
      SUBSCRIBERS_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Subscribers Success",
      },
      SUBSCRIBERS_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Subscribers List Failure",
      },

      SUBSCRIBERS_UPDATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Subscribers Updated Successfully",
      },

      SUBSCRIBERS_UPDATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Subscribers Update Failure",
      },
      SUBSCRIBERS_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Subscribers Deleted Successfully",
      },
      SUBSCRIBERS_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Subscribers Delete Failure",
      },
    },
    CONTACT: {
      CREATE_CONTACT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Contact Created Successfully",
      },
      CREATE_CONTACT_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Contact Not Created ",
      },
      CONTACT_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Contact Not Found",
      },
      CONTACT_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Contact Found",
      },
      CONTACT_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Contact List Success",
      },
      CONTACT_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Contact List Failure",
      },

      CONTACT_UPDATE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Contact Updated Successfully",
      },

      CONTACT_UPDATE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Contact Update Failure",
      },
      CONTACT_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Contact Deleted Successfully",
      },
      CONTACT_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Contact Delete Failure",
      },
    },
    CAREER_CATEGORY: {
      CREATE_CAREER_CATEGORY_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Career Category Created Successfully",
      },
      CREATE_CAREER_CATEGORY_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Career Category Not Created",
      },
      UPDATE_CAREER_CATEGORY_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Career Category Updated Successfully",
      },
      UPDATE_CAREER_CATEGORY_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Career Category Not Updated",
      },
      CAREER_CATEGORY_IN_USED: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Career Category is used in media",
      },
      CAREER_CATEGORY_NAME_ALREADY_USED: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Career Category Name Already Used",
      },
      CAREER_CATEGORY_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Career Category Not Found",
      },
      CAREER_CATEGORY_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Career Category Found",
      },
      CAREER_CATEGORY_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Career Category List ",
      },
      CAREER_CATEGORY_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: true,
        message: "Career Category List Failure ",
      },
      CAREER_CATEGORY_DELETE_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Career Category Deleted Successfully",
      },
      CAREER_CATEGORY_DELETE_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Career Category Delete Failure",
      },
    },
    CAREER: {
      CREATE_CAREER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Career Created Successfully",
      },
      CREATE_CAREER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Career Create Failure",
      },
      CAREER_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Career Not Found",
      },
      CAREER_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Career Found",
      },
      UPDATE_CAREER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Career Updated Successfully",
      },
      UPDATE_CAREER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Career Update Failure",
      },
      DELETE_CAREER_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Career Deleted Successfully",
      },
      DELETE_CAREER_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Career Delete Failure",
      },
      SLUG_EXISTS: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Slug already exists",
      },
    },
    APPLICANTS: {
      CREATE_APPLICANT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Applicant Created Successfully",
      },
      ALREADY_APPLIED: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "You Have Already Applied For This Position",
      },
      CREATE_APPLICANT_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Applicant Create Failure",
      },
      APPLICANT_NOT_FOUND: {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Applicant Not Found",
      },
      APPLICANT_FOUND: {
        status: httpStatus.OK,
        success: true,
        message: "Applicant Found",
      },
      APPLICANT_LIST_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Applicant List Failure ",
      },
      APPLICANT_LIST_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Applicant List Success ",
      },
      UPDATE_APPLICANT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Applicant Updated Successfully",
      },
      UPDATE_APPLICANT_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Applicant Update Failure",
      },
      UPDATE_SELECTED_APPLICANT_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Selected applicant cannot be unselected",
      },
      DELETE_APPLICANT_SUCCESS: {
        status: httpStatus.OK,
        success: true,
        message: "Applicant Deleted Successfully",
      },
      DELETE_APPLICANT_FAILURE: {
        status: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Applicants Delete Failure",
      },
    },
  },
};
