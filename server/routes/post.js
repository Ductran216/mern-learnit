const express = require('express');
const router = express.Router();

const postController = require('../controllers/PostController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, postController.show);
router.post('/', verifyToken, postController.create);
router.put('/:id', verifyToken, postController.update);
router.delete('/:id', verifyToken, postController.delete);

module.exports = router;
