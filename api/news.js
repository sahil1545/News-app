const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { category = 'general', page = 1, max = 15 } = req.query;
    const apiKey = process.env.GNEWS_API_KEY || '9d27c0e98d9d1ba30340b3f6088cf746';
    
    let url;
    if (category === 'general') {
      url = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&apikey=${apiKey}&page=${page}&max=${max}`;
    } else {
      url = `https://gnews.io/api/v4/search?q=${category}&lang=en&country=in&apikey=${apiKey}&page=${page}&max=${max}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news', 
      message: error.message 
    });
  }
};
