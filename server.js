import express from 'express';
import path from 'path';
import fs from 'fs';
import markdown from 'markdown-it';

const app = express();
const port = 3000;
const md = markdown();

// Serve static files (optional, if you have other static assets)
app.use(express.static('public'));

// Root route to serve a welcome page or redirect
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Developpement Best Practices</h1>
    <p>Check out the best practices documents:</p>
    <ul>
      <li><a href="/markdown/best-practices/Node.js%20Best%20Practices.md">Node.js Best Practices</a></li>
      <li><a href="/markdown/best-practices/CSS%20Best%20Practices.md">CSS Best Practices</a></li>
      <li><a href="/markdown/best-practices/JavaScript%20Best%20Practices.md">JavaScript Best Practices</a></li>
      <li><a href="/markdown/best-practices/React%20Best%20Practices.md">React Best Practices</a></li>
      <li><a href="/markdown/best-practices/Next.js%20Best%20Practices.md">Next.js Best Practices</a></li>
      <li><a href="/markdown/best-practices/HTML%20Best%20Practices.md">HTML Best Practices</a></li>
    </ul>
  `);
});

// Middleware to serve Markdown files
app.get('/markdown/best-practices/:file', (req, res) => {
  // Construct the file path based on the requested file
  const filePath = path.join(process.cwd(), 'markdown', 'best-practices', req.params.file);

  // Check if the file exists and respond accordingly
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.send(md.render(fileContent));
  } else {
    res.status(404).send('File not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Markdown server listening at http://localhost:${port}`);
});
