const {Router} = require('express');
const { getUsers, addUser } = require('../controllers/usersControllers');
const router = Router();

router.get("/", getUsers);
router.post("/", addUser);

module.exports = router;