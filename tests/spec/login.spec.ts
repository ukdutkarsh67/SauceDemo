import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { readExcelFile } from '../../util/readExcelFile';
import * as log from '../../util/logger';
test.describe.parallel('login tests',async () => {
    let loginPage:LoginPage;
    let readexcelFile:readExcelFile;
    let userData:any;
    test.beforeEach(async ({ page }) => {
      loginPage=new LoginPage(page)
      await loginPage.goto();
      readexcelFile =new readExcelFile();
      userData=await readexcelFile.getUserCredentials();
    });
    
    test('Login with valid account credentials', async () => {
        await loginPage.login(userData[0],userData[1]);
        await loginPage.verifyPageLoaded();
        await log.Logger.info( "Successfully logged in to the application" );
    });
    
    test('Login with invalid account credentials', async () => {
        await loginPage.login(userData[0]+'11',userData[1]+'11');
        await loginPage.verifyErrorMessage();
        await log.Logger.info('Invalid username or password entered');
    });
  });