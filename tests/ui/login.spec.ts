import { test, expect } from '../../fixtures/test.fixture';

test.describe('Login UI', () => {

  test('valid user can login and reach dashboard', async ({
    loginPage,
    users
  }) => {

    await loginPage.goto();

    await loginPage.login(
      users.valid.email,
      users.valid.password
    );

    await expect(loginPage.page)
      .toHaveURL(/dashboard/);

    await expect(
      loginPage.page.getByRole('heading', {
        name: 'Customer Support Dashboard'
      })
    ).toBeVisible();
  });

  test('invalid password shows error', async ({
    loginPage,
    users
  }) => {
    await loginPage.goto();

    await loginPage.login(
      users.invalidPassword.email,
      users.invalidPassword.password
    );

    await expect(loginPage.message)
      .toHaveText('Invalid email or password');

    await expect(loginPage.message)
      .toHaveAttribute('data-status', 'error');
  });

});