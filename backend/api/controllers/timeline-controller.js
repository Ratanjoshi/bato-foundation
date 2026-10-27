const timelineService = require("../services/timeline-service");
const {
  createTimelineSchema,
  updateTimelineSchema,
} = require("../../validations/timeline-validation");

class TimelineController {
  async getAll(req, res) {
    try {
      // If request comes from frontend public (no params), still works
      const timelines = await timelineService.getAll(req.query);
      return res.status(200).json({ success: true, data: timelines });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const timeline = await timelineService.getById(req.params.id);
      if (!timeline) {
        return res
          .status(404)
          .json({ success: false, message: "Timeline entry not found" });
      }
      return res.status(200).json({ success: true, data: timeline });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { error, value } = createTimelineSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }
      const timeline = await timelineService.create(value);
      return res
        .status(201)
        .json({ success: true, data: timeline, msg: "Created successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { error, value } = updateTimelineSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }
      const timeline = await timelineService.update(req.params.id, value);
      if (!timeline) {
        return res
          .status(404)
          .json({ success: false, message: "Timeline entry not found" });
      }
      return res
        .status(200)
        .json({ success: true, data: timeline, msg: "Updated successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await timelineService.delete(req.params.id);
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Timeline entry not found" });
      }
      return res.status(200).json({
        success: true,
        message: "Timeline entry deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async togglePublish(req, res) {
    try {
      const { isPublished } = req.body;
      const timeline = await timelineService.togglePublish(
        req.params.id,
        isPublished,
      );
      if (!timeline) {
        return res
          .status(404)
          .json({ success: false, message: "Timeline entry not found" });
      }
      return res
        .status(200)
        .json({ success: true, data: timeline, msg: "Publish status updated" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new TimelineController();
