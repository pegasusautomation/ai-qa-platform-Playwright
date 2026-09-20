import {test, expect} from '@playwright/test';

test.describe('Date Picker', () => {    
    test('should select a date from the date picker', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
        await page.fill('#datepicker', '02/09/1987'); // Click on the date picker input field
    });
});