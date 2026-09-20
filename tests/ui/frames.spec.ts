// import {test, expect} from '@playwright/test';

// test.describe('Date Picker', () => {
//     test('Handing frame'    , async ({ page }) => {
//         await page.goto('https://ui.vision/demo/webtest/frames/');
//        const frames =  await page.frames();
//        console.log(`Number of frames: ${frames.length}`);

//     //    // approach 1: Using frame name or ID
//     //    const frame1 =  await page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_1'});
//     //    await frame1?.fill("[name='mytext1']", 'Hello');
//     //    await page.waitForTimeout(5000);

//     //    // approach 2: Using frame locator
//     //    const fame2 = await page.frameLocator("frame[src='frame_1.html']").locator("[name='mytext1']");

//     //     await fame2.fill('Hello from frame 2');
//     //     await page.waitForTimeout(5000);

//          // approach 2: Using frame locator
//        const fame3 = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3'});

//        const childframe = await fame3?.childFrames();
//        await childframe[0].locator().check();

//         await page.waitForTimeout(5000);
//     });
// });