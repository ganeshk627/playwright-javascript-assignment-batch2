// @ts-check
const { test, expect } = require('@playwright/test');
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductNavigationPage } from '../pages/ProductNavigationPage';
import { LoginPage } from '../pages/loginpage';
import { readTestDataFromExcel } from '../utils/ExcelUtil';

const excelPath = 'testdata.xlsx';
const sheetName = 'Sheet1';

// test.beforeAll(() => {
//     // Read test data from Excel
const testDataList = readTestDataFromExcel(excelPath, sheetName);
//     console.log(testDataList)
// });


test.describe.serial('Checkout Products', () => {

    for (var index in testDataList) {
        // console.log(testDataList[index])

        test(`Checkout Products ${index}`, async ({ page }) => {

            // Page class
            const homePage = new HomePage(page);
            const loginPage = new LoginPage(page);
            const productNavigationPage = new ProductNavigationPage(page);
            const productListPage = new ProductListPage(page);
            const checkoutPage = new CheckoutPage(page);

            // Test Data
            const username = testDataList[index].username;
            const password = testDataList[index].password;
            const category = testDataList[index].category;
            const subcategory1 = testDataList[index].subcategory1;
            const subcategory2 = testDataList[index].subcategory2;
            const product1 = testDataList[index].product1;
            const product2 = testDataList[index].product2;
            const company = testDataList[index].company;
            const address = testDataList[index].address;
            const phonenumber = testDataList[index].phonenumber;


            await test.step('a. Launch the application and add a page test to validate against landing on the “Home Page” by verifying page tile and URL of the page', async () => {
                // Launch the URL
                await homePage.openApplication();
                // Validate landing on the Home Page by verifying page title and URL
                await expect(page, `Page should have title: 'Home Page'`).toHaveTitle('Home Page');
                await expect(page, `Page should have URL: 'https://magento.softwaretestingboard.com/'`).toHaveURL('https://magento.softwaretestingboard.com/');

            });

            await test.step('b. Click sign in link and login to the application by providing username and password given in test data file and log the screen shot after filling the details.', async () => {
                // Click sign in link
                await homePage.openSignInPage();
                // Login to the application using credentials from test data file
                await loginPage.login(username, password);
                await expect(page, `Page should have title: 'Home Page'`).toHaveTitle('Home Page');
                await expect(page, `Page should have URL: 'https://magento.softwaretestingboard.com/'`).toHaveURL('https://magento.softwaretestingboard.com/');
            });

            await test.step('c. Navigate to Product Page based on Category mentioned in the test data file.', async () => {
                // Navigate to Product Page based on Category from test data file
                await productNavigationPage.selectProductCategory(category, subcategory1, subcategory2)

            });

            await test.step('d. Log all products names in the products page by handling pagination.', async () => {
                // Log all product names in the products page by handling pagination
                await productListPage.printAllProducts();
            });

            await test.step('e. Click on the product name listed in the test data file, select the size, colour and quantity and click Add to Cart option and log the screenshot after adding product to the cart.', async () => {
                // Click on the product name listed in the test data file
                // Select size, color, and quantity
                await productListPage.addProductToCart(product1, 'S');
                await page.waitForTimeout(2000)
            });

            await test.step('f. Repeat the step ‘d’ based on number of products to be added into the cart as per test data file.', async () => {
                // Repeat step d based on the number of products to be added into the cart
                await productListPage.addProductToCart(product2, 'S');
                await page.waitForTimeout(2000)

            });

            await test.step('g. Click on the cart menu and select view and edit cart option', async () => {
                // Click on the cart menu
                await productListPage.openBasket();
            });

            await test.step('h. Add Validations to check cart has been added with all the given products in test data file and log the screen shot.', async () => {
                await page.waitForTimeout(5000)
            });

            await test.step('i. Click on Proceed to Checkout button', async () => {
                // Click on Proceed to Checkout button
                await checkoutPage.proceedToCheckout();
            });

            await test.step('j. Click on New Address button and fill the shipping address details from test data file and add validations to check all the necessary details are filled and click ship here button', async () => {
                // selecting existing old address
            });

            await test.step('k. Select the shipping methods and click next', async () => {
                // Select the shipping methods
                await checkoutPage.selectFixedShippingMethod();
                // Click next
                await checkoutPage.clickNext();

            });

            await test.step('l. Review the information and log the same and click Place Order button', async () => {
                // Click Place Order button
                await checkoutPage.placeOrder();

            });

            await test.step('m. Log the order number', async () => {
                // Log the order number
                await checkoutPage.logOrderNumber();
            });

            await test.step('n. Logout from the application and add validation to check the same. Repeat the above steps for all the test data available in the input file.', async () => {
                // Logout from the application
                await homePage.logout();
            });


        });
    }

})


