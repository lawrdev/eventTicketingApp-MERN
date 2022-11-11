const express = require('express');
const router = express.Router()

const {
    getAllEvents,
    getSearchEvents,
    getEvent,
    getCategoryEvents,
} = require('../controllers/eventController')
const { getCreator } = require('../controllers/userController')


router.route('/:id').get(getEvent)
router.route('/all/:lastDate').get(getAllEvents)
router.route('/creator/:uid').get(getCreator)
router.route('/search/:q').get(getSearchEvents)
router.route('/category/:q').get(getCategoryEvents)


module.exports = router