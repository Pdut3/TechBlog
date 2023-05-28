const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.Comment('/', withAuth, async (_req, res) => {
    try {
        res.status(200).json(Comment);
    } catch (err) {
        res.status(400).json(err);
    }
});







module.exports = router;