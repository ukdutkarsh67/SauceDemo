import { expect, Locator, Page } from '@playwright/test';

export class CartPage{
    private readonly page:Page;
    private readonly AddedProduct:Locator;
    private readonly productLabel:Locator;
    private readonly checkout:Locator;

    constructor(page: Page){
        this.page=page;
        this.AddedProduct=page.locator('[class="inventory_item_name"]');
        this.productLabel=page.locator('.cart_item_label');
        this.checkout=page.locator('[data-test="checkout"]');
    }

    public async verifyAddedProduct(productName):Promise<boolean>{
        const AddedProductCount=await this.AddedProduct.count();
        for(let i=0;i<AddedProductCount;i++){
            const prodName=await this.AddedProduct.nth(i).textContent();
            if(prodName===productName){
               return true;
            }
        }
        return false;
    }

    public async verifyPriceOfProduct(productName,price){
        const productLabelCount=await this.productLabel.count();
        for(let i=0;i<productLabelCount;i++){
            const prodName=await this.productLabel.nth(i).locator('a div').textContent();
            if(prodName===productName){
                const productPrice:any=await this.productLabel.nth(i).locator('div div').textContent();
                const pp=productPrice.split('$');
                await expect(pp).toBe(price);
                break;
            }
        }
    }
    public async clickCheckout(){
        await this.checkout.click();
    }
}