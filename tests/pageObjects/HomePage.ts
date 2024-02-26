import { expect, Locator, Page } from '@playwright/test';

export class HomePage{
    private readonly page: Page;
    private readonly menuSection:Locator;
    private readonly menuList:Locator;
    private readonly filter:Locator;
    private readonly productList:Locator;
    private readonly shoppingCart:Locator;
    private readonly productClickCount:Locator;
    private readonly aboutUs:Locator;
    private prodCount:any;

    constructor(page: Page){
        this.page=page;
        this.menuList=page.locator('.bm-item menu-item');
        this.menuSection=page.locator('#react-burger-menu-btn');
        this.filter=page.locator('[class="product_sort_container"]');
        this.productList=page.locator('.inventory_item .inventory_item_description');
        this.shoppingCart=page.locator('[class="shopping_cart_link"]');
        this.productClickCount=page.locator('.shopping_cart_link span');
        this.aboutUs=page.getByRole('link', { name: 'Pricing' });
    }

    public async clickMenuSection(){
        await this.menuSection.click();
    }

    public async clickMenuList(menuName: string){

        const menuListCount=await this.menuList.count();
        console.log(menuListCount);
        for(let i=0;i<menuListCount;i++){
            const menuListName=await this.menuList.nth(i).textContent();
            if(menuListName===menuName){
                await this.menuList.nth(i).click();
                break;
            }
        }
    }

    public async selectFilter(filtername){
        await this.filter.selectOption(filtername);
    }

    public async addToCart(prodName: string){
        const productListCount=await this.productList.count();
        for(let i=0;i<productListCount;i++){
            const productName=await this.productList.nth(i).locator('div a div').textContent();
            if(productName===prodName){
                await this.productList.nth(i).locator('div button').click();
                break;
            }
        }
    }

    public async clickShoppingCart(){
        await this.shoppingCart.click();
    }

    public async getProductCount():Promise<string>{
        this.prodCount=await this.productClickCount.textContent();
        return this.prodCount;
    }


    public async openProductInDetail(prodName: string){
        const productListCount=await this.productList.count();
        for(let i=0;i<productListCount;i++){
            const productName=await this.productList.nth(i).locator('div a div').textContent();
            if(productName===prodName){
                await this.productList.nth(i).locator('div a').click();
                break;
            }
        }
    }

    public async verifyClickPage(){
        await expect(this.aboutUs).toHaveText('Pricing');
    }

}