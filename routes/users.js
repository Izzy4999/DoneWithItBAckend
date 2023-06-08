const express = require("express");
const router = express.Router();
const Joi = require("joi");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
  name: Joi.string().required().min(4),
});

router.post("/", validateWith(schema), (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body;
  if (usersStore.getUserByEmail(email))
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });

  const user = { name, email, password };
  usersStore.addUser(user);

  res.status(201).send(user);
});

router.get("/", (req, res) => {
  res.send(usersStore.getUsers());
});

module.exports = router;
