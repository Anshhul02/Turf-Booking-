const Turf=require("../models/addturf");


async function get(req, res)  {
  const { adminId } = req.params;
try {
  const turfs = await Turf.find({ adminId });

  if (!turfs.length) {
    return res.status(404).json({ message: "No turfs found for this admin." });
  }

  res.json(turfs);
} catch (error) {
  res.status(500).json({ message: "Error fetching turfs", error: error.message });
}
}
module.exports={get};