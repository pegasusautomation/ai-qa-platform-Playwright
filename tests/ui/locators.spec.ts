import {test, chromium, Browser, Page, expect} from '@playwright/test';

test.describe('Locators', () => {
    test('should locate elements using different strategies', async () => {
        const browser:Browser = await chromium.launch({
            headless:false,
            args:['--start-maximized']
        });
        const page:Page = await browser.newPage();
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await expect(page).toHaveTitle(/OrangeHRM/);
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
        await page.getByRole('textbox',{name: 'Password'}).fill('admin123');

        await page.getByRole('button', {name:'Login'}).click();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        await page.getByText('Admin', {exact:true});
        await page.getByTestId('Admin').click();
    })
});
        // Locate an element by its text content
