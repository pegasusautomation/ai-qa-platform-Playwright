import { Router } from "express";

const router = Router();

router.get("/login", (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>AI QA Platform - Login</title>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 400px;
            margin: 100px auto;
          }

          input {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            box-sizing: border-box;
          }

          button {
            width: 100%;
            padding: 10px;
            cursor: pointer;
          }

          #message {
            margin-top: 15px;
          }
        </style>
      </head>

      <body>
        <h1>AI Customer Support</h1>

        <form id="loginForm">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
          />

          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
          />

          <button type="submit">Login</button>
        </form>

        <div id="message"></div>

        <script>
          document
            .getElementById('loginForm')
            .addEventListener('submit', async (event) => {

              event.preventDefault();

              const email =
                document.getElementById('email').value;

              const password =
                document.getElementById('password').value;

              const response = await fetch(
                '/api/auth/login',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email,
                    password
                  })
                }
              );

              const result = await response.json();

              const message =
                document.getElementById('message');

              if (result.success) {
  window.location.href = '/dashboard';
} else {
                message.textContent = result.message;
                message.setAttribute('data-status', 'error');
              }
            });
        </script>
      </body>
    </html>
  `);
});

router.get('/dashboard', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>AI QA Platform - Dashboard</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 60px auto;
          }

          textarea {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
          }

          button {
            padding: 10px 20px;
            margin-top: 10px;
            cursor: pointer;
          }

          #chatContainer {
            display: none;
            margin-top: 30px;
          }

          #answer {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid #ccc;
          }
        </style>
      </head>

      <body>

        <h1>Customer Support Dashboard</h1>

        <p>Welcome to AI Customer Support.</p>

        <button id="supportButton">
          Ask AI Support
        </button>

        <div id="chatContainer">

          <h2>AI Customer Support</h2>

          <label for="question">
            Your question
          </label>

          <textarea
            id="question"
            rows="4"
            placeholder="Ask a question..."
          ></textarea>

          <br>

          <button id="askButton">
            Ask AI
          </button>

          <p id="answer"></p>

        </div>

        <script>
          document
            .getElementById('supportButton')
            .addEventListener('click', () => {

              document.getElementById('chatContainer')
                .style.display = 'block';
            });

          document
            .getElementById('askButton')
            .addEventListener('click', async () => {

              const question =
                document.getElementById('question').value;

              const response = await fetch(
                '/api/chat',
                {
                  method: 'POST',

                  headers: {
                    'Content-Type': 'application/json'
                  },

                  body: JSON.stringify({
                    question
                  })
                }
              );

              const result = await response.json();

              document.getElementById('answer')
                .textContent = result.answer;
            });
        </script>

      </body>
    </html>
  `);
});

export default router;
