import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage{
    private readonly page:Page;
    private readonly CheckoutPage:Locator;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly pincode:Locator;
    private readonly continueButton:Locator;
    private readonly productPrice:Locator;
    private readonly totalPrice:Locator;
    private readonly finishButton:Locator;
    private readonly orderPlace:Locator;

    constructor(page: Page){
        this.page=page;
        this.CheckoutPage=page.getByText('Checkout: Your Information');
        this.firstName=page.locator('[data-test="firstName"]');
        this.lastName=page.locator('[data-test="lastName"]');
        this.pincode=page.locator('[data-test="postalCode"]');
        this.continueButton=page.locator('[data-test="continue"]');
        this.productPrice=page.locator('[class="inventory_item_price"]');
        this.totalPrice=page.locator('[class="summary_subtotal_label"]');
        this.finishButton=page.locator('[data-test="finish"]');
        this.orderPlace=page.locator('[class="complete-header"]');
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

    public async priceValidation(){
        const productPriceCount=await this.productPrice.count();
        let totalAmount:number=0;
        for(let i=0;i<productPriceCount;i++){
            const priceText:any=await this.productPrice.nth(i).textContent();
            const price=priceText.split('$');
            let priceNo=+price[1];
            totalAmount=totalAmount+priceNo;
        }
        const totalPriceText:any=await this.totalPrice.textContent();
        const total_price=totalPriceText.split('$')
        let total_Price=+total_price[1];
        await expect(total_Price).toBe(totalAmount);
        
    }

    public async clickFinishButton(){
        await this.finishButton.click();
    }

    public async orderPlacedConfirm(){
        await expect(this.orderPlace).toHaveText('Thank you for your order!');
    }

}