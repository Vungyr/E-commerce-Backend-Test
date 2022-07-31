const User = require('../entities/user');

// Casos de uso para el manejo de users.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class ManageUsersUsecase {

  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async getUsersBuyers() {
    return await this.usersRepository.getUsersBuyers();
  }

  async getUsersSellers() {
    return await this.usersRepository.getUsersSellers();
  }

  async getUsers() {
    return await this.usersRepository.getUsers();
  }

  async getUser(id) {
    return await this.usersRepository.getUser(id);
  }

  async createUser(data) {
    
    const user = new User(undefined, data.name, data.email, data.password, data.is_admin);
    const id = await this.usersRepository.createUser(user);
    user.id = id;

    return user;

  }

  async updateUser(id, data) {

    const user = new User(id, data.name, data.email, data.password, data.is_admin);
    await this.usersRepository.updateUser(user);

    return user;
  }

  async deleteUser(id) {
    await this.usersRepository.deleteUser(id);
  }

}

module.exports = ManageUsersUsecase;