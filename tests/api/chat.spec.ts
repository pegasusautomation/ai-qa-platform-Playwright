import { test, expect } from '../../fixtures/test.fixture';

test.describe('AI Support API', () => {

  test('answers password reset question', async ({ request }) => {

    const response = await request.post('/api/chat', {
      data: {
        question: 'How do I reset my password?'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.question).toBe('How do I reset my password?');
    expect(body.answer).toContain('reset your password');
  });


  test('returns refund information', async ({ request }) => {

    const response = await request.post('/api/chat', {
      data: {
        question: 'How can I get a refund?'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.answer).toContain('Refund');
  });


  test('rejects empty question', async ({ request }) => {

    const response = await request.post('/api/chat', {
      data: {}
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.message).toBe('Question is required');
  });

});