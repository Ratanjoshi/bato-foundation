const partnerService = require("../services/partnerService");

exports.getPartners = async (req, res, next) => {
  try {
    // If the request has ?all=true (from Admin Panel), return full objects
    const isAdmin = req.query.all === "true";
    const partners = await partnerService.getAllPartners(isAdmin);

    // Public site only needs an array of strings
    const data = isAdmin ? partners : partners.map((p) => p.name);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.createPartner = async (req, res, next) => {
  try {
    const partner = await partnerService.createPartner(req.body);
    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    next(error);
  }
};

exports.updatePartner = async (req, res, next) => {
  try {
    const partner = await partnerService.updatePartner(req.params.id, req.body);
    if (!partner)
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    next(error);
  }
};

exports.deletePartner = async (req, res, next) => {
  try {
    const deleted = await partnerService.deletePartner(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    res.status(200).json({ success: true, message: "Partner deleted" });
  } catch (error) {
    next(error);
  }
};
