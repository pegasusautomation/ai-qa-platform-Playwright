export const users = {
  valid: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password123'
  },

  invalidPassword: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'WrongPassword'
  },

  unknownUser: {
    name: 'Unknown User',
    email: 'unknown@example.com',
    password: 'Password123'
  }
};

export type TestUser = typeof users.valid;