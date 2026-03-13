const express = require("express");
const registrationModel = require("./model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await registrationModel.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new registrationModel(req.body);

    await user.save();

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const update = await registrationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json({
      success: true,
      data: update,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await registrationModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
