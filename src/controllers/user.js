var User = require("..//models/user").User;

const login = async (req, res) => {
  const { userData } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ userName: userData.userName });

    if (user && user.isValidPassword(userData.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  } catch (e) {
    res.status(400).json({ errors: { global: "Invalid credentials" } });
  }
};

const signup = async (req, res) => {
  const { userData } = req.body;
  console.log("userData", userData);
  var user = new User();

  user.userName = userData.userName;
  user.userEmail = userData.userEmail;
  user.setPassword(userData.password);
  try {
    let savedUser = await user.save();

    res.json({ user: user.toAuthJSON() });
  } catch (e) {
    res.status(400).json({ errors: { global: "Invalid credentials" } });
  }
};

var userController = {
  login,
  signup
};

module.exports = userController;
