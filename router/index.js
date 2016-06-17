var express = require('express');
var router = express.Router();

router.use(require('./routes/action'));
router.use(require('./routes/plan'));
router.use(require('./routes/task'));
router.use(require('./routes/taskType'));
router.use(require('./routes/taskCategory'));
router.use(require('./routes/user'));
router.use(require('./routes/userRole'));
router.use(require('./routes/document'));
router.use(require('./routes/meeting'));

module.exports = router;
