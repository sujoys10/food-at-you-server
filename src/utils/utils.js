const jwt = require('jsonwebtoken')

const getUser = token => {
  if(token){
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  }
  return null
}


module.exports = {
  getUser
}