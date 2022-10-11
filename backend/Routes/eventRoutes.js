const express = require('express');
const router = express.Router()
const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController')

// 'protect' middleware for routes
const { protect } = require('../middlewares/authMiddleware')

// ROUTES
router.route('/').get(protect, getEvents).post(protect, createEvent)

router
    .route('/:id')
    .get(protect, getEvent)
    .delete(protect, deleteEvent)
    .put(protect, updateEvent)


module.exports = router