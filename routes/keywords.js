const express = require('express');
const router = express.Router();

const keywordsController =  require('../controllers/keywordsController');


router.get('/', keywordsController.list);

router.post('/add', keywordsController.save);

router.get('/delete/:id', keywordsController.delete);

router.get('/update/:id', keywordsController.edit);
router.post('/update/:id', keywordsController.update);


module.exports = router;
