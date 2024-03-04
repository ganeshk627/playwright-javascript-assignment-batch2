//@ts-check
exports.ProductListPage = class ProductListPage {

    constructor(page) {
        this.page = page;
        this.inventory_title = '.title';
        this.inventory_item = 'div.product-item-info';
        this.inventory_item_name = 'strong.product-item-name a';
        this.size = '[aria-label="Size"] div';
        this.color ='[aria-label="Color"] div'
        this.add_to_cart_button = 'button[title="Add to Cart"]';
        this.basket_icon ='div.minicart-wrapper';
    }

    async addProductToCart(productName, size, color) {
        await this.page.waitForSelector(this.inventory_item);
        const items = await this.page.locator(this.inventory_item).all();
        // console.log(`items: ${items.length}`)
        for (const item of items) {
            const itemName = await item.locator(this.inventory_item_name).textContent();
            // console.log(itemName)
            if (itemName.includes(productName)) {

                //selecting szie
                const psizes = await item.locator(this.size).all();
                for (const psize of psizes) {
                    const sizetext = await psize.textContent();
                    if (sizetext === size) {
                        await psize.click();
                        console.log(`${size} selected!!!`)
                    }
                }
                await this.page.waitForTimeout(2000)

                //selecting color
                await item.locator(this.color).first().click();
                await this.page.waitForTimeout(2000)

                //selecting product
                // await item.locator(this.inventory_item_name).hover();
                await item.locator(this.add_to_cart_button).click();
                console.log(`${productName} added to cart!!!`)
                break;
            }
        }
    }

    async printAllProducts() {
        await this.page.waitForSelector(this.inventory_item);
        const items = await this.page.locator(this.inventory_item).all();
        console.log(`product items: ${items.length}`)
        for (const item of items) {
            const itemName = await item.locator(this.inventory_item_name).textContent();
            console.log(itemName)
        }
    }

    async openBasket(){
        // await this.page.locator(this.basket_icon).dispatchEvent('click');
        await this.page.locator(this.basket_icon).click();
    }
};
