const User = require('../model/user');

const registerUser = async (req, res) => {
  try {
    const { firstName, LastName, DateOfBirth, PlaceOfBirth, Gender, Nationality, MaritalStatus, SettlementCamp, DateOfJoiningSettlementCamp } = req.body;

    // Validating required fields
    if (!firstName || !LastName || !DateOfBirth || !PlaceOfBirth || !Gender || !Nationality || !MaritalStatus || !SettlementCamp || !DateOfJoiningSettlementCamp) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    const newUser = new User({
      firstName,
      LastName,
      DateOfBirth,
      PlaceOfBirth,
      Gender,
      Nationality,
      MaritalStatus,
      SettlementCamp,
      DateOfJoiningSettlementCamp,
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
module.exports = registerUser;