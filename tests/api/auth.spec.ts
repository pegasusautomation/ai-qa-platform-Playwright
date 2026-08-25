import { test, expect } from '../../fixtures/test.fixture';

test.describe('Authentication API', () => {

  test('successful login', async ({ authApi, users }) => {
    const response = await authApi.login(users.valid);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.token).toBeTruthy();
    expect(body.user.email).toBe(users.valid.email);
    expect(body.user.name).toBe('John Doe');
  });

  test('login fails with invalid password', async ({
    authApi,
    users
  }) => {
    const response = await authApi.login(users.invalidPassword);

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.message).toBe('Invalid email or password');
  });

  test('login fails for unknown user', async ({
    authApi,
    users
  }) => {
    const response = await authApi.login(users.unknownUser);

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.message).toBe('Invalid email or password');
  });

});