import jwt from "jsonwebtoken";

export const setCookies = (user, res, status = 200, message) => {
  ////? simultaniouly login in the account ;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_Secrate);

  res
    .status(status)
    .cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 })
    .json({
      sucess: true,
      message: message,
    });
};
