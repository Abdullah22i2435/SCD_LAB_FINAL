const Profile = require('../models/Profile');

// Create or update user profile
exports.updateProfile = async (req, res) => {
  const { userId } = req;
  const { bio, avatar } = req.body;

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { bio, avatar },
      { new: true, upsert: true }
    );
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  const { userId } = req;

  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};