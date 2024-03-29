const express = require('express')
const { addBucket, removeBucket, renameBucket, getBuckets, moveCards, getSingleBucket } = require('../controllers/bucketController')
const router = express.Router();
const { requireAuth, checkUser } = require('../middleware/authMiddleware')


router.get('/all', requireAuth, getBuckets);
router.get('/single/:id', getSingleBucket)
router.post('/add', requireAuth, addBucket)
router.delete('/remove', removeBucket);
router.patch('/rename', renameBucket);
router.patch('/movecard', moveCards);

module.exports = router;