//@ts-check
exports.CheckoutPage = class CheckoutPage {

    constructor(page) {
        this.page = page;

        this.checkout_button = '[title="Proceed to Checkout"]'
        this.order_number = 'div.checkout-success strong'

    }


    async proceedToCheckout() {
        await this.page.locator(this.checkout_button).click();
    }

    async selectFixedShippingMethod() {
        await this.page.getByLabel('Fixed').check();
    }

    async clickNext() {
        await this.page.getByRole('button', { name: 'Next' }).click();

    }
    async placeOrder() {
        await this.page.getByRole('button', { name: 'Place Order' }).click();
    }

    async logOrderNumber() {
        const ordernumber = await this.page.locator(this.order_number).textContent();
        console.log(`Order Number: ${ordernumber}`)
    }


};
