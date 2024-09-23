const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
      console.log(req.cookies);
    const tokenCookieValue = req.cookies[cookieName];
    // console.log("--");
    
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      console.log(userPayload);
      
    } catch (error) {
        throw error("User not found")
    }

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
