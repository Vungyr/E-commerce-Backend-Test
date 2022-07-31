const Auth = require('../entities/auth');
const bcrypt = require('bcrypt')
const authModule = require('../token/token')

// Casos de uso para el manejo de categorias.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class ManageAuthUsecase {

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async login(data) {
    
    const credentials = new Auth(undefined, data.email, data.password);
    const user = await this.userRepository.findByEmail(credentials.email)
    if(!user){
        return false
    }

    const passwordsMatch = bcrypt.compareSync(credentials.password, user.password);
    if(!passwordsMatch) {
        return false
    }

    const token = getToken(user.id)
    return { token };

  }


  async register(data) {

    const checkEmail = await this.userRepository.findByEmail(data.email);
    if(checkEmail){
        return false;
    }

    const user = new Auth(undefined, data.email, data.password, data.name, data.is_admin);

    user.password = bcrypt.hashSync(data.password, 10)

    const userCreated = await this.userRepository.createUser(user);
    const token = getToken(userCreated);

    return { userCreated, token };

  }

}

function getToken (user) {
    const tokenPayload = {
      userId: user
    }
    const token = authModule.createToken(tokenPayload)
    return token
}

module.exports = ManageAuthUsecase;