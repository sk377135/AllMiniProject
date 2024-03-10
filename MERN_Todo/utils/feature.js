import jwt from "jsonwebtoken";

export const setCookies = (user, res, message, status = 200) => {
  ////? simultaniouly login in the account ;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_Secrate);

  res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      SameSite: process.env.NODE_ENV === "developement" ? "LEX" : "none",
      secure: process.env.NODE_ENV === "developement" ? false : true,
    })
    .json({
      sucess: true,
      message: message,
    });
};
