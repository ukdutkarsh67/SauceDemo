import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { HomePage } from '../pageObjects/HomePage';
import { ProductPage } from '../pageObjects/ProductPage';
import { CartPage } from '../pageObjects/CartPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';
import { readExcelFile } from '../../util/readExcelFile';
import * as log from '../../util/logger';
test.describe.parallel('login tests',async () => {
    let loginPage:LoginPage;
    let homePage:HomePage;
    let productPage:ProductPage;
    let cartPage:CartPage;
    let checkoutPage:CheckoutPage;
    let readexcelFile:readExcelFile;
    let userCredentials:any;
    let productName:any;
    let userDetails:any;
    test.beforeEach(async ({ page }) => {
      loginPage=new LoginPage(page);
      homePage=new HomePage(page);
      cartPage=new CartPage(page);
      productPage=new ProductPage(page);
      checkoutPage=new CheckoutPage(page);
      readexcelFile =new readExcelFile();
      userCredentials=await readexcelFile.getUserCredentials();
      productName=await readexcelFile.getProductName();
      userDetails=await readexcelFile.getUserDetails();
      await loginPage.goto();
    });
    test('e2e flow',async()=>{

        await test.step('Login credentials', async () => {
            await loginPage.login(userCredentials[0], userCredentials[1]);
            await log.Logger.info( "Successfully logged in to the application" );
        });

        await test.step('Select filter', async () => {
            await homePage.selectFilter('za');
            await log.Logger.info('filter Selected');
        });

        await test.step('Add products to cart', async () => {
            await homePage.addToCart(productName[0]);
            await homePage.addToCart(productName[1]);
            await log.Logger.info('product added');
        });

        await test.step('Open product in detail', async () => {
            await homePage.openProductInDetail(productName[2]);
        });

        await test.step('Add product to cart from detail page', async () => {
            await productPage.clickAddToCart();
        });

        await test.step('Go to cart', async () => {
            await productPage.clickShoppingCart();
        });

        await test.step('Go to checkout', async () => {
            await cartPage.clickCheckout();
        });

        await test.step('Verify checkout page', async () => {
            await checkoutPage.verifyCheckoutPage();
        });

        await test.step('Fill checkout details', async () => {
            await checkoutPage.fillDetails(userDetails[0], userDetails[1], userDetails[2].toString());
        });

        await test.step('Click continue button', async () => {
            await checkoutPage.clickContinue();
        });

        await test.step('Validate price', async () => {
            await checkoutPage.priceValidation();
        });

        await test.step('Click finish button', async () => {
            await checkoutPage.clickFinishButton();
        });

        await test.step('Verify order placed confirmation', async () => {
            await checkoutPage.orderPlacedConfirm();
            await log.Logger.info('Order Placed')
        });

    })

});