const {Router} = require('express');
const { addCountry } = require('../controllers/countryControllers');
const router = Router();

router.post("/", addCountry);

module.exports = router;