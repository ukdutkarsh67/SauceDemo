import { expect, Locator, Page } from '@playwright/test';


export class LoginPage {
    private readonly page: Page;
    private readonly url: string;
    private readonly usernameInputField: Locator;
    private readonly passwordInputField: Locator;
    private readonly loginButton: Locator;
    private readonly dataTest:Locator;
    private readonly errorMessage:Locator;
    private readonly verifyLoginSuccessfull:Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.url="https://www.saucedemo.com/";
      this.usernameInputField = page.locator('[data-test="username"]');
      this.passwordInputField = page.locator('[data-test="password"]');
      this.loginButton = page.locator('[data-test="login-button"]');
      this.verifyLoginSuccessfull=page.locator('[class="title"]');
      this.errorMessage=page.getByText('Username and password do not match');
      this.dataTest=page.locator('[data-test="error"]');
    }
  
    public async goto() {
      await this.page.goto(this.url);
    }
  
    public async verifyPageLoaded(){
      await expect(this.verifyLoginSuccessfull).toBeVisible();
    }
  
    public async login(username: string, password: string) {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.loginButton.click();
    }
  
    public async fillUsername(username:string){
      await this.usernameInputField.click();
      await this.usernameInputField.fill(username);
    }
  
    public async fillPassword(password: string){
      await this.passwordInputField.click();
      await this.passwordInputField.fill(password);
    }

    public async verifyErrorMessage(){
        await expect(this.dataTest).toBeVisible();
        await expect(this.errorMessage).toBeVisible();
    }
  
  
   
  }