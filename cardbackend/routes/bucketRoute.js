const express = require('express')
const  {addBucket, removeBucket, renameBucket, getBuckets, moveCards, getSingleBucket} = require('../controllers/bucketController')
const router = express.Router();
const {requireAuth, checkUser} = require('../middleware/authMiddleware')


router.get('/all' ,getBuckets);
router.get('/single/:id',getSingleBucket)
router.post('/add', addBucket)
router.delete('/remove', removeBucket);
router.patch('/rename', renameBucket);
router.patch('/movecard', moveCards);

module.exports = router;