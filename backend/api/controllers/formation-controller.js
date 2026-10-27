const { FormationStory } = require("../../models");

// GET /api/v1/formation
exports.getFormationStory = async (req, res) => {
  try {
    const story = await FormationStory.findOne({
      order: [["createdAt", "ASC"]],
    });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Formation story not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: story,
    });
  } catch (error) {
    console.error("[getFormationStory Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// PATCH /api/v1/formation
exports.updateFormationStory = async (req, res) => {
  try {
    // 1. Find the existing record
    const story = await FormationStory.findOne();
    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Formation story not found",
      });
    }

    // 2. Update with the validated data (already passed through middleware)
    await story.update(req.body);

    return res.status(200).json({
      success: true,
      data: story,
      message: "Formation story updated successfully",
    });
  } catch (error) {
    console.error("[updateFormationStory Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
