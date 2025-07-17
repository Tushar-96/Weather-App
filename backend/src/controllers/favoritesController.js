const db = require('../config/firebase');

// Add a favorite city
exports.addFavorite = async (req, res) => {
  try {
    const { userId, city } = req.body;
    const docRef = await db.collection('favorites').add({ userId, city });
    console.log('Favorite added:', { id: docRef.id, userId, city });
    res.status(201).json({ id: docRef.id, userId, city });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all favorites for a user
exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.query;
    const snapshot = await db.collection('favorites').where('userId', '==', userId).get();
    const favorites = [];
    snapshot.forEach(doc => {
      favorites.push({ id: doc.id, ...doc.data() });
    });
    console.log('Favorites fetched for user:', userId, favorites);
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a favorite city
exports.removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('favorites').doc(id).delete();
    console.log('Favorite removed:', id);
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 