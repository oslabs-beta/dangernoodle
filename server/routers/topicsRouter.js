const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topicsController.js');

router.get('/topics', topicsController.totalTopicCount, (req, res) => {
    return res.status(200).json(res.locals /*.whatever*/);
  }
);

router.get('/topics', topicsController.totalTopicCount, (req, res) => {
    return res.status(200).json(res.locals /*.whatever*/);
  }
);

module.exports = router;