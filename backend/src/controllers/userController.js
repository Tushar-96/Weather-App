const db = require('../config/firebase');

// Save user settings
exports.saveSettings = async (req, res) => {
  try {
    const { userId, unit, theme, language } = req.body;
    await db.collection('settings').doc(userId).set({ unit, theme, language }, { merge: true });
    res.json({ message: 'Settings saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 