import {test, expect} from '@playwright/test';

test.describe('Select Table Item', () => {
    test('should select a table item based on its text content', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/'); // Replace with the actual URL of the page containing the table      // Locate the table row containing the specific text    const tableRow = page.locator('tr', { hasText: 'Specific Text' }); // Repla

        const table =  page.locator('#productTable');
        const rows =  table.locator('tbody tr');
        const columns =  table.locator('thead tr th');

        console.log(`Number of rows: ${await rows.count()}`);
        console.log(`Number of columns: ${await columns.count()}`);
        expect(await rows.count()).toBe(5); // Replace with the expected number of rows
        expect(await columns.count()).toBe(4); // Replace with the expected number of columns
        await getTableRowByText(page, rows, 'Laptop');
        await getTableRowByText(page, rows, 'Smartphone');
    });

    async function getTableRowByText(page:any, rows: any, text: string) {
    const matchedrow= await rows.filter({
            has: page.locator('td'),
            hasText:text
        });
        matchedrow.locator('input').check(); // Check the checkbox in the matched row
        await page.waitForTimeout(5000);
}
});

