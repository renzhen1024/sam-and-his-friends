const express = require('express');

const post = include('data/post');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	res.render('index', post);
});

module.exports = router;
