import { test, expect, Browser, Page, chromium } from "@playwright/test";

test.describe("Alter", () => {
  test("should alter the content of an element", async () => {
    const browser:Browser = await chromium.launch({headless:false, args:['--start-maximized']});
    const page:Page = await browser.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/"); // Replace with the actual URL of the page containing the element to be altered   const element = page.locator("#elementId"); // Replace with the actual selector of the element to be altered
  
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('I am an alert box!');
        dialog.accept();
    });

    // Alter the content of the element
    await page.getByRole('button', { name: 'Simple Alert' }).click(); 

    await page.waitForTimeout(5000);

    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('Press a button!');
        dialog.dismiss();
    });

    await page.getByRole('button', { name: 'confirmBtn' }).click();
});
});