const {
  clipArtModel,
  employeeModel,
  qnaModel,
  timeTableHeaderModel,
  userModel,
  settingModel,
  socialModel,
  bannerItemsModel,
  portfolioMediaModel,
  portfolioSubImageModel,
  portfolioModel,
  testimonialModel,
  technologyModel,
  bannerModel,
  pagesModel,
  serviceUsedCaseModel,
  serviceModel,
  applicantModel,
} = require("../../models");
const { Op, literal } = require("sequelize");

async function checkIfMediaPathInUse(mediaPath) {
  // Define the models and their respective fields
  const checks = [
    {
      model: clipArtModel,
      fields: ["img_png"],
      name: "ClipArt",
    },
    {
      model: employeeModel,
      fields: [
        "web_view_img",
        "mobile_view_img",
        "emp_carousel_img",
        "emp_carousel_hov_img",
        "emp_quote_img_one",
        "emp_quote_img_two",
        "message_img",
        "round_img",
      ],
      name: "Employee",
    },
    {
      model: qnaModel,
      fields: ["img"],
      name: "Qna",
    },
    {
      model: settingModel,
      fields: ["fav_icon", "brandingImage", "brandingFooterImage"],
      name: "Setting",
    },
    {
      model: socialModel,
      fields: ["fav_icon"],
      name: "Social",
    },
    {
      model: timeTableHeaderModel,
      fields: ["img_one", "img_two"],
      name: "TimeTableHeader",
    },
    {
      model: userModel,
      fields: ["imageUrl"],
      name: "User",
    },
    {
      model: bannerModel,
      fields: ["video_url"],
      name: "Banner",
    },
    {
      model: pagesModel,
      fields: ["og_image"],
      name: "Pages",
    },

    {
      model: bannerItemsModel,
      fields: ["image"],
      name: "BannerItem",
    },
    {
      model: portfolioMediaModel,
      fields: ["image"],
      name: "PortfolioMedia",
    },
    {
      model: portfolioSubImageModel,
      fields: ["svg_string"],
      name: "PortfolioSubImage",
    },
    {
      model: testimonialModel,
      fields: ["image"],
      name: "Testimonial",
    },
    {
      model: technologyModel,
      fields: ["image"],
      name: "Technology",
    },

    {
      model: portfolioModel,
      fields: [
        "desktop_view_url",
        "mobile_view_url",
        "tablet_view_url",
        "portfolioLogo",
        "core_tech_img",
        "portfolioImages",
      ],
      name: "Portfolio",
    },
    {
      model: serviceUsedCaseModel,
      fields: ["img_path"],
      name: "ServiceUsedCases",
    },
    {
      model: serviceModel,
      fields: ["img_path"],
      name: "Service",
    },
    {
      model: applicantModel,
      fields: ["cv_path"],
      name: "Applicant",
    },
    {
      model: blogModel,
      fields: ["image"],
      name: "Blog Image",
    },
  ];

  const checksResult = await Promise.all(
    checks.map(async ({ model, fields, name }, i) => {
      const whereClause = {
        [Op.or]: fields.map((field) => {
          // Check if the field is JSON based on model schema
          const isJsonField = model.rawAttributes[field]?.type?.key === "JSON";

          if (isJsonField) {
            // JSON field: Check if mediaPath is in the JSON array
            return literal(`JSON_CONTAINS(${field}, '"${mediaPath}"')`);
          } else {
            // Regular field: Direct comparison
            return { [field]: mediaPath };
          }
        }),
      };

      const result = await model.findOne({ where: whereClause });
      return result ? name : null;
    }),
  );

  console.log(checksResult);

  const usedInModules = checksResult.filter((module) => module !== null);

  return usedInModules;
}

module.exports = checkIfMediaPathInUse;
