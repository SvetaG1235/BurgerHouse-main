import express from "express";
import UserService from "../services/UserService.js";
const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allUsers = await UserService.getAllUsers()
  const user = allUsers[1]
  console.log(user)
  res.render('user.hbs', {
    ...user.dataValues
  })
});
router.post('/', async function(req, res, next) {
  const newUser = await UserService.addUser()
  res.send(newUser);
});

export default router
