const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists,you can login", success: false });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "internal server error", success: false });
  }
};
const login = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const msgerror = "Auth failed email or password is incorrect";
      if (!user) {
        return res.status(409).json({ message: msgerror, success: false });
      }
      const ispassequal = await bcrypt.compare(password, user.password);
      if (!ispassequal) {
        return res.status(409).json({ message: msgerror, success: false });
      }
      const jwttoken = jwt.sign(
          { email: user.email, _id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "30h" }
      );
    res
      .status(200)
      .json({ message: "User created successfully", success: true ,jwttoken,email,name: user.name});
  } catch (err) {
    res.status(500).json({ message: "internal server error", success: false });
  }
};
module.exports = { signup,login };
