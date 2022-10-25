const express = require('express');
const router = express.Router()
const {
    getEvents,
    createEvent,
    eventUpdates,
    deleteEvent,
} = require('../controllers/eventController')

// 'protect' middleware for routes
const { protect } = require('../middlewares/authMiddleware')

// ROUTES
router.route('/').get(protect, getEvents).post(protect, createEvent)

router
    .route('/:id')
    .delete(protect, deleteEvent)
    .put(protect, eventUpdates)

module.exports = router