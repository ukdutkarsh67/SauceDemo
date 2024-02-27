import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import ExcelJS from 'exceljs';
test.describe.parallel('login tests',async () => {
    let loginPage:LoginPage;
    test.beforeEach(async ({ page }) => {
      loginPage=new LoginPage(page)
      await loginPage.goto();
    });
    
    test('Login with valid account credentials', async ({   }) => {
        await loginPage.login("standard_user","secret_sauce");
        await loginPage.verifyPageLoaded();
    });
    
    test('Login with invalid account credentials', async ({ page}) => {
        await loginPage.login(`secret_sauce+ 11`,`secret_sauce + 11`);
        await loginPage.verifyErrorMessage();
    });
  });