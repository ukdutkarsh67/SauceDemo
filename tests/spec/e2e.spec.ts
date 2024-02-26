import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { HomePage } from '../pageObjects/HomePage';
import { ProductPage } from '../pageObjects/ProductPage';
import { CartPage } from '../pageObjects/CartPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';
test.describe.parallel('login tests',async () => {
    let loginPage;
    let homePage;
    let productpage;
    let cartPage;
    let checkoutPage;
    test.beforeEach(async ({ page }) => {
      loginPage=new LoginPage(page);
      homePage=new HomePage(page);
      cartPage=new CartPage(page);
      productpage=new ProductPage(page);
      checkoutPage=new CheckoutPage(page);
      await loginPage.goto();
    });
    test.only('e2e flow',async({page})=>{
        await loginPage.login("standard_user","secret_sauce");
        //await homePage.clickMenuSection();
        //await page.waitForTimeout(3000);
        // await homePage.clickMenuList('About');
        // await homePage.verifyClickPage();
        await homePage.selectFilter('za');
        await homePage.addToCart('Sauce Labs Bolt T-Shirt');
        await homePage.addToCart('Sauce Labs Onesie');
        await expect(await homePage.getProductCount()).toBe('2');
        await homePage.openProductInDetail('Sauce Labs Fleece Jacket');
        await productpage.clickAddToCart();
        await expect(await homePage.getProductCount()).toBe('3');
        await productpage.clickShoppingCart();
        await cartPage.clickCheckout();
        await checkoutPage.verifyCheckoutPage();
        await checkoutPage.fillDetails('utkarsh','dwivedi','208019');
        await checkoutPage.clickContinue();
        await page.pause();
    })

});