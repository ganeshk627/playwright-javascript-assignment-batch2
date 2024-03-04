//@ts-check
exports.ProductNavigationPage = class ProductNavigationPage {

    constructor(page) {
      this.page = page;
      
    }
  
   
    async selectProductCategory(category, subcategory1, subcategory2) {
      await this.page.getByRole('menuitem', { name: category }).hover();
      await this.page.getByRole('menuitem', { name: subcategory1 }).hover();
      await this.page.getByRole('menuitem', { name: subcategory2 }).click();

    }
  };
  