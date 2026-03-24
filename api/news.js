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
    
    // Use the provided API key directly
    const apiKey = '9d27c0e98d9d1ba30340b3f6088cf746';
    
    let url;
    if (category === 'general') {
      url = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&apikey=${apiKey}&page=${page}&max=${max}`;
    } else {
      url = `https://gnews.io/api/v4/search?q=${category}&lang=en&country=in&apikey=${apiKey}&page=${page}&max=${max}`;
    }

    console.log('Fetching URL:', url);

    const response = await fetch(url);
    
    console.log('Response status:', response.status);
    
    // Get response as text first
    const responseText = await response.text();
    console.log('Response type check - first 100 chars:', responseText.substring(0, 100));
    
    // Check if response is ok
    if (!response.ok) {
      console.error('API Error Response:', responseText);
      return res.status(response.status).json({ 
        error: 'API Error', 
        message: `API returned status ${response.status}`,
        details: responseText
      });
    }

    // Check if response starts with HTML (error page)
    if (responseText.startsWith('<!DOCTYPE') || responseText.startsWith('<html')) {
      console.error('API returned HTML instead of JSON:', responseText.substring(0, 200));
      return res.status(500).json({ 
        error: 'Invalid Response', 
        message: 'API returned HTML instead of JSON',
        details: responseText.substring(0, 200)
      });
    }

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Response that failed to parse:', responseText.substring(0, 200));
      return res.status(500).json({ 
        error: 'JSON Parse Error', 
        message: 'Failed to parse API response as JSON',
        details: responseText.substring(0, 200)
      });
    }
    
    console.log('Successfully parsed API data');

    // Check if API returned an error
    if (data.errors && data.errors.length > 0) {
      console.error('API Errors:', data.errors);
      return res.status(400).json({ 
        error: 'API Response Error', 
        message: data.errors[0] || 'API returned an error',
        details: data.errors
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Server Error', 
      message: error.message,
      stack: error.stack
    });
  }
};
