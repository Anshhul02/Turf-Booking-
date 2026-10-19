const Turf=require("../models/addturf");

async function send(req, res){
    try {
        const turfs = await Turf.find(); // Fetch all turfs from database
        res.json(turfs);
      } catch (error) {
        res.status(500).json({ message: "Error fetching turfs", error });
      }
    };
module.exports={send}