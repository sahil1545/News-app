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

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'News-App/1.0',
        'Accept': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    // Get response text first to debug
    const responseText = await response.text();
    console.log('Response text (first 200 chars):', responseText.substring(0, 200));
    
    // Check if response is ok before parsing JSON
    if (!response.ok) {
      console.error('API Error Response:', responseText);
      
      if (response.status === 401) {
        return res.status(401).json({ 
          error: 'API Key Error', 
          message: 'The API key is invalid or expired. Please check your Gnews API key.',
          details: responseText
        });
      } else if (response.status === 429) {
        return res.status(429).json({ 
          error: 'Rate Limit Exceeded', 
          message: 'API rate limit exceeded. Please try again later.',
          details: responseText
        });
      } else {
        return res.status(response.status).json({ 
          error: 'API Error', 
          message: `API returned status ${response.status}`,
          details: responseText
        });
      }
    }

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type response:', responseText);
      return res.status(500).json({ 
        error: 'Invalid Response', 
        message: 'API returned non-JSON response',
        details: responseText
      });
    }

    // Parse JSON now that we know it's valid
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Response that failed to parse:', responseText);
      return res.status(500).json({ 
        error: 'JSON Parse Error', 
        message: 'Failed to parse API response as JSON',
        details: responseText
      });
    }
    
    console.log('API Response data:', data);
    
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
