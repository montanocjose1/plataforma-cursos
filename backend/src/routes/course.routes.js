const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse } = require('../controllers/course.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.route('/').get(getCourses).post(protect, admin, createCourse);
router.route('/:id').get(getCourseById);

module.exports = router;
