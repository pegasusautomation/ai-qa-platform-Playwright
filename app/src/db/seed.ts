import db from './database';

const existingUser = db
  .prepare('SELECT id FROM users WHERE email = ?')
  .get('john@example.com');

if (!existingUser) {
  db.prepare(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
  ).run(
    'John Doe',
    'john@example.com',
    'Password123'
  );

  console.log('Test user created');
} else {
  console.log('Test user already exists');
}