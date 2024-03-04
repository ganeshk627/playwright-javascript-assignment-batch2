//@ts-check
exports.HomePage = class HomePage {

    constructor(page) {
      this.page = page;
      this.signin_button = 'header li.authorization-link';
      this.welcome_message = 'div.header ul.header > li.customer-welcome'
      this.signout = 'div.header .customer-menu li[data-label="or"] a'
     
    }
  
    async openApplication() {
      await this.page.goto('/'); // Update URL accordingly
    }
  
    async openSignInPage() {
     await this.page.locator(this.signin_button).click();
    }

    async logout() {
      await this.page.locator(this.welcome_message).click(); 

      await this.page.locator(this.signout).click();
    }
  
   
  };
  