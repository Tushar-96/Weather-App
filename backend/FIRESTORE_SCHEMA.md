# Firestore Collections & Document Structure

## favorites
Each document represents a favorite city for a user.
- `userId`: string (reference to user)
- `city`: string (name of the city)

## settings
Each document represents a user's settings/preferences. The document ID can be the user's ID.
- `unit`: string ("C" or "F")
- `theme`: string ("light" or "dark")
- `language`: string (e.g., "en")

## users (optional)
Each document represents a user account.
- `username`: string
- `email`: string
- `createdAt`: timestamp

---

> Firestore is schema-less, but this structure is recommended for consistency and validation in your app logic. 