const { verifyToken } = require('../token/token')
const SequelizeUsersRepository = require('../../users/repositories/user-repository');
const SequelizeClient = require('../../frameworks/db/sequelize');

const sequelizeClient = new SequelizeClient();
const userRepository = new SequelizeUsersRepository(sequelizeClient);
sequelizeClient.syncDatabase();

const getTokenPayload = (req) => {
  const authToken = req.headers.authorization
  const token = authToken && authToken.startsWith('Bearer ') && authToken.split(' ')[1]
  if (!token) {
    const error = new Error('Please provided a token Bearer in authorization')
    error.status = 401
    throw error
  }
  return verifyToken(token)
}

const isAdmin = async (req, res, next) => {
  try {
    const token = getTokenPayload(req)
    const user = await userRepository.getUser(token.userId)
    if (!user.is_admin) {
        return res.status(401).json({ error: 'Not admin user.' })
    }
    next()
  } catch (error) {
    next(error)
  }
}

const isAuth = async (req, res, next) => {
  try {
    const token = getTokenPayload(req)
    const user = await userRepository.getUser(token.userId)
    if (!user) {
      return res.status(401).json({ error: 'Not found user with token provided.' })
    }
    req.authUser = user.dataValues
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  isAdmin,
  isAuth,
  getTokenPayload,
}