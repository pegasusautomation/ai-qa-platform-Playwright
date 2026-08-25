import { Router } from 'express';
import db from '../db/database';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  const user = db
    .prepare(
      'SELECT id, name, email FROM users WHERE email = ? AND password = ?'
    )
    .get(email, password) as
    | { id: number; name: string; email: string }
    | undefined;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  return res.json({
    success: true,
    token: `demo-token-${user.id}`,
    user
  });
});

export default router;