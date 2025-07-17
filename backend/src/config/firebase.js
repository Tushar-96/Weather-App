const admin = require('firebase-admin');
const serviceAccount = require('../../firebaseServiceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('✅ Firestore database connected');
}

const db = admin.firestore();

module.exports = db;
