const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static('.'));

// Handle root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle HTML files in the html directory
app.get('/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'html', `${page}.html`), (err) => {
        if (err) {
            // If file not found in html directory, try root directory
            res.sendFile(path.join(__dirname, `${page}.html`), (err) => {
                if (err) {
                    res.status(404).send('Page not found');
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Available pages:');
    console.log('- http://localhost:3000/ (home)');
    console.log('- http://localhost:3000/dailyDeals');
    console.log('- http://localhost:3000/offerzone');
    console.log('... and other pages in the html/ directory');
});
