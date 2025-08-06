# Deployment Guide

This document explains how to deploy the Tetris game to various platforms.

## GitHub Pages (Recommended)

GitHub Pages provides free hosting for static websites directly from your repository.

### Setup Steps:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access your game**
   - Your game will be available at: `https://yourusername.github.io/repository-name`
   - It may take a few minutes to deploy

## Local Development Server

For local testing and development:

### Using Python (Built-in)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Using Node.js
```bash
# Install a simple server
npm install -g http-server

# Run the server
http-server
```

### Using PHP
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Other Deployment Options

### Netlify
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site will be deployed automatically

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase init hosting`
3. Run `firebase deploy`

## Custom Domain (Optional)

If you want to use a custom domain with GitHub Pages:

1. Add a `CNAME` file to your repository root
2. Put your domain name in the file (e.g., `tetris.yourdomain.com`)
3. Configure your domain's DNS to point to GitHub Pages
4. Enable HTTPS in repository settings

## Performance Optimization

For production deployment, consider:

- Minifying CSS and JavaScript files
- Optimizing images
- Enabling gzip compression
- Using a CDN for better global performance

## Troubleshooting

### Common Issues:

**Game not loading:**
- Check browser console for errors
- Ensure all files are properly uploaded
- Verify file paths are correct

**GitHub Pages not updating:**
- Check the Actions tab for deployment status
- Clear browser cache
- Wait a few minutes for propagation

**Mobile issues:**
- Test on actual devices
- Check viewport meta tag
- Verify touch events work properly