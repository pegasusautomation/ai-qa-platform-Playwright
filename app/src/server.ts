import 'dotenv/config';
import express from 'express';
import authRouter from './routes/auth';
import uiRouter from './routes/ui';
import chatRouter from './routes/chat';
import evaluationRouter from './routes/evaluation';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/', uiRouter);
app.use('/api', chatRouter);
app.use('/api', evaluationRouter);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI QA Platform API running on http://0.0.0.0:${PORT}`);
});