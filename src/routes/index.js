import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Web App Burger house.hbs', { title: 'Express' });
});

export default router