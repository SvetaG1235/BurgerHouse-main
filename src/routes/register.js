import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register.hbs', { title: 'Express' });
});
router.get('/enter', function(req, res, next) {
    res.render('enter.hbs', { title: 'Express' });
  });

export default router