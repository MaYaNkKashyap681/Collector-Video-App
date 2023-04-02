const express = require('express')
const  {addCard, removeCard, updateCard, getCards} = require('../controllers/cardController')
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware')


router.get('/all', getCards);
router.post('/add', addCard);
router.patch('/update', updateCard);
router.delete('/remove', removeCard);

module.exports = router;