import { expect, Locator, Page } from '@playwright/test';

export class ProductPage{
    private readonly page: Page;
    private readonly productName:Locator;
    private readonly addProduct:Locator;
    private readonly shoppingCart:Locator;

    constructor(page: Page){
        this.page=page;
        this.productName=page.locator('[class="inventory_details_name large_size"]');
        this.addProduct=page.getByText('Add to cart');
        this.shoppingCart=page.locator('[class="shopping_cart_link"]');
    }

    public async clickAddToCart(){
        await this.addProduct.click();
    }

    public async verifyProduct(product:string){
        await expect(this.productName).toHaveText(product);
    }

    public async clickShoppingCart(){
        await this.shoppingCart.click();
    }

    
}