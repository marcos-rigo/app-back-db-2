const User = require("../models/User");
const CustomError = require("../utils/customError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const { gender, pageNumber } = req.query;
    const page = (pageNumber - 1) * 2;
    let users;
    let count;
    if (!gender) {
      [users, count] = await Promise.all([
        await User.find().skip(page).limit(2).populate("country", "-_id"),
        await User.countDocuments(),
      ]);

      // users = await User.find().skip(page).limit(2);
      // users = await User.find();
      // count = await User.countDocuments();
    } else {
      users = await User.find({ gender });
    }
    // throw new CustomError("Esto es una prueba del CustomError", 502);
    res.status(200).json({ users, count });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: "I'm sorry, something is wrong with us" });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, lastname, email, age, gender, admin, country, password } =
      req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordEncripted = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      lastname,
      email,
      age,
      gender,
      admin,
      country,
      password: passwordEncripted,
    });

    const userSaved = await newUser.save();
    res
      .status(200)
      .json({ message: "El usuario se agregó con éxito", user: userSaved });
  } catch (error) {
    res.status(error.code || 500).json({
      message: error.message || "Algo falló en los contrroladores de usuarios",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new CustomError("Ingrese usuario o contraseña", 400);

    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Usuario no encontrado", 404);

    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) throw new CustomError("Contraseña incorrecta", 400);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "Ingreso con éxito", ok: true, user, token });
  } catch (error) {
    res.status(error.code || 500).json({
      message: error.message || "Algo falló en los contrroladores de usuarios",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const userRemoved = await User.findByIdAndDelete(id);
    if (!userRemoved) throw new CustomError("Usuario no encontrado", 404);
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(error.code || 500).json({
      message: error.message || "Algo falló en los contrroladores de usuarios",
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  login,
  deleteUser,
};
