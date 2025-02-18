import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/cart', function(req, res, next) {
  res.render('cart.hbs', { title: 'Express' });
});


export default router