const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/', blogController.blogIndex);

router.post('/', blogController.blogCreatePost)

router.get('/create', blogController.blogCreateGet)

router.get('/:id', blogController.blogDetailsGet)

router.delete('/:id', blogController.blogDetailsDelete)

router.post('/:id', blogController.blogDetailsPost)

router.get('/update/:id', blogController.blogUpdate)

module.exports = router;