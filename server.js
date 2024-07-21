import express from 'express';
import path from 'path';
import fs from 'fs';
import markdown from 'markdown-it';

// Initialize the app
const app = express();
const port = 4321;
const md = markdown();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Middleware to serve Markdown files
app.get('/markdown/best-practices/:file', (req, res) => {
  const filePath = path.join(process.cwd(), 'markdown', 'best-practices', req.params.file);

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const htmlContent = md.render(fileContent);
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${req.params.file.replace(/-/g, ' ').replace('.md', '')}</title>
          <link rel="stylesheet" href="/styles/tailwind.css">
          <link rel="stylesheet" href="/styles/markdown.css">
      </head>
      <body class="bg-gray-100 text-gray-900 font-sans flex flex-col min-h-screen">
          <header class="bg-gray-900 text-white shadow-md">
              <div class="container mx-auto px-6 py-4 flex items-center justify-between">
                  <h1 class="text-3xl font-bold">Developpement Best Practices</h1>
                  <nav>
                      <ul class="flex space-x-4">
                          <li><a href="/" class="hover:text-gray-300">Home</a></li>
                      </ul>
                  </nav>
              </div>
          </header>
          <main class="w-full flex-grow container mx-auto px-6 py-8">
              <article class="prose lg:prose-xl mx-auto bg-white shadow-lg rounded-lg p-8">
                  ${htmlContent}
              </article>
          </main>
          <footer class="bg-gray-900 text-white text-center py-4 mt-6">
              <p>&copy; 2024 Developpement Best Practices. All rights reserved.</p>
          </footer>
      </body>
      </html>
    `);
  } else {
    res.status(404).send('File not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
