const express = require('express');
const router = express.Router();
const { createDID, issueVC } = require('../controllers/identityController');

router.post('/create-did', createDID);
router.post('/issue-vc', issueVC);

module.exports = router;
