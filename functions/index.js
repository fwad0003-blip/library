const { onRequest } = require('firebase-functions/v2/https')
const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const logger = require('firebase-functions/logger')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore, FieldValue } = require('firebase-admin/firestore')
const cors = require('cors')({ origin: true })

initializeApp()
const db = getFirestore()

// eFolio 9.1 — HTTP function returning the number of documents in "books".
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection('books').count().get()
      const count = snapshot.data().count
      res.status(200).send({ count })
    } catch (error) {
      logger.error('Error counting books', error)
      res.status(500).send('Error counting books')
    }
  })
})

// eFolio 9.2 — Firestore trigger: whenever a book is added, capitalise every
// string field and write the result back, keeping the original input in
// "originalData" so the before/after can be shown in the browser.
exports.capitaliseBookData = onDocumentCreated('books/{bookId}', async (event) => {
  const snapshot = event.data
  if (!snapshot) return

  const data = snapshot.data()
  const capitalised = {}
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') capitalised[key] = value.toUpperCase()
  }

  logger.info(`Capitalising book ${event.params.bookId}`, { before: data, after: capitalised })

  await snapshot.ref.update({
    ...capitalised,
    originalData: data,
    capitalisedAt: FieldValue.serverTimestamp(),
  })
})
