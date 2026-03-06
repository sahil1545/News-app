# Deployment Configuration

## Environment Variables
Create a `.env` file in the root directory with:
```
REACT_APP_NEWS_API_KEY=your_news_api_key_here
REACT_APP_COUNTRY=us
```

## Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test the build locally
serve -s build
```

## Deployment Platforms

### Netlify
1. Connect your repository
2. Set environment variables in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `build`

### Vercel
1. Import your repository
2. Set environment variables in Vercel dashboard
3. Build command: `npm run build`
4. Output directory: `build`

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"homepage": "https://yourusername.github.io/news-app",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

## Important Notes
- Never commit `.env` file to version control
- Always set environment variables in your hosting platform
- The app requires the NewsAPI key to function
- Bootstrap CSS and JS are loaded from CDN for better performance
