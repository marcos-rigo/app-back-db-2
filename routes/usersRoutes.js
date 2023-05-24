const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, addUser, login, deleteUser } = require("../controllers/usersControllers");
const validateFields = require("../middlewares/validateFields");
const { checkIfUserExist } = require("../utils/customValidations");
const auth = require("../middlewares/auth");
// const User = require("../models/User");
const router = Router();

router.get("/", auth,  getUsers);
router.post(
  "/",
  [
    check("name").not().isEmpty().isString().isLength({ min: 2, max: 30 }),
    check("lastname").not().isEmpty().isString().isLength({ min: 2, max: 30 }),
    check("email").isEmail(),
    check("age").isFloat({min:0, max:150}),
    check("gender").isIn("M", "F", "X"),
    check("admin").isBoolean(),
    check("country").isMongoId(),
    check("password")
      .not()
      .isEmpty()
      .matches(
        /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
      ),
    validateFields,
  ],
  addUser
);

router.post(
  "/login",
  [
    check("email").isEmail().isLength({ min: 5, max: 50 }),
    check("password").not().isEmpty(),
    validateFields,
  ],
  login
);

router.delete("/", [
  auth,
  check("id").not().isEmpty().isMongoId().custom(checkIfUserExist),
  validateFields,
  
], deleteUser)

module.exports = router;
