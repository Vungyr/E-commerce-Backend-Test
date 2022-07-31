const Categorie = require('../entities/categorie');

// Casos de uso para el manejo de categorias.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class ManageCategoriesUsecase {

  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async getCategories() {
    return await this.categoriesRepository.getCategories();
  }

  async getCategoriesBuyerUser(id) {
    return await this.categoriesRepository.getCategoriesBuyerUser(id);
  }

  async getCategorie(id) {
    return await this.categoriesRepository.getCategorie(id);
  }

  async createCategorie(data) {
    
    const categorie = new Categorie(undefined, data.name, data.description);
    const id = await this.categoriesRepository.createCategorie(categorie);
    categorie.id = id;

    return categorie;

  }

  async updateCategorie(id, data) {

    const categorie = new Categorie(id, data.name, data.description);
    await this.categoriesRepository.updateCategorie(categorie);

    return categorie;

  }

  async deleteCategorie(id) {
    await this.categoriesRepository.deleteCategorie(id);
  }

}

module.exports = ManageCategoriesUsecase;