const axios = require('axios');
const cheerio = require('cheerio');

async function investigateRobloxPage() {
  const url = 'https://gamehag.com/es/juegos/roblox';

  try {
    console.log('Fetching the Roblox page from Gamehag...');
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract page title
    const title = $('title').text().trim();
    console.log(`Page Title: ${title}`);

    // Extract main description
    const description = $('meta[name="description"]').attr('content') || 'No description found';
    console.log(`Description: ${description}`);

    // Extract navigation menu items - look for common menu patterns
    const navItems = [];
    $('a[href]').each((i, elem) => {
      const text = $(elem).text().trim();
      const href = $(elem).attr('href');
      if (text && href && text.length > 1 && text.length < 30 && !href.startsWith('#') && !href.includes('javascript:') && !href.includes('mailto:')) {
        // Filter for navigation-like items
        if (text.match(/(Ganar|Retirar|Tienda|Clasificación|Sorteos|Login|Únete|Earn|Withdraw|Store|Ranking|Giveaways)/i)) {
          navItems.push({ text, href });
        }
      }
    });
    console.log('Navigation Items:');
    navItems.slice(0, 20).forEach(item => console.log(`  - ${item.text}: ${item.href}`));

    // Extract forum topics - look for forum-related content
    const forumTopics = [];
    $('*').each((i, elem) => {
      const text = $(elem).text().trim();
      if (text && text.length < 100 && (text.includes('ROBUX') || text.includes('HOLA') || text.match(/\d{1,3} response/) || text.match(/Dec \d{1,2}, 2025/))) {
        forumTopics.push(text);
      }
    });
    console.log('Recent Forum Topics:');
    forumTopics.slice(0, 10).forEach(topic => console.log(`  - ${topic}`));

    // Extract articles or guides - look for article content
    const articles = [];
    $('*').each((i, elem) => {
      const text = $(elem).text().trim();
      if (text && text.length < 200 && (text.toLowerCase().includes('cómo conseguir') || text.toLowerCase().includes('free robux') || text.toLowerCase().includes('pros y contras'))) {
        articles.push({ title: text });
      }
    });
    console.log('Articles/Guides:');
    articles.forEach(article => console.log(`  - ${article.title}`));

    console.log('Investigation complete.');

  } catch (error) {
    console.error('Error fetching or parsing the page:', error.message);
  }
}

investigateRobloxPage();