import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage{
    private readonly page:Page;
    private readonly CheckoutPage:Locator;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly pincode:Locator;
    private readonly continueButton:Locator;

    constructor(page: Page){
        this.page=page;
        this.CheckoutPage=page.getByText('Checkout: Your Information');
        this.firstName=page.locator('[data-test="firstName"]');
        this.lastName=page.locator('[data-test="lastName"]');
        this.pincode=page.locator('[data-test="postalCode"]');
        this.continueButton=page.locator('[data-test="continue"]');
    }
    public async verifyCheckoutPage(){
        await expect(this.CheckoutPage).toBeVisible();
    }

    public async fillDetails(first_name: string,last_name: string,pinCode: string){
        await this.firstName.fill(first_name);
        await this.lastName.fill(last_name);
        await this.pincode.fill(pinCode);
    }

    public async clickContinue(){
        await this.continueButton.click();
    }

}