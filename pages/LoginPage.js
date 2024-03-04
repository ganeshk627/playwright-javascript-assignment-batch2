//@ts-check
exports.LoginPage = class LoginPage {

  constructor(page) {
    this.page = page;
    this.usernameInput = '#email';
    this.passwordInput = '[title="Password"]';
    this.loginButton = 'fieldset [name="send"]';
  }

  async openApplication() {
    await this.page.goto('/'); // Update URL accordingly
  }

  async enterUsername(username) {
    await this.page.waitForSelector(this.usernameInput);
    await this.page.locator(this.usernameInput).pressSequentially(username);
  }

  async enterPassword(password) {
    await this.page.waitForSelector(this.passwordInput);
    await this.page.locator(this.passwordInput).pressSequentially(password);
  }

  async clickLoginButton() {
    await this.page.waitForSelector(this.loginButton);
    await this.page.click(this.loginButton);
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
};
