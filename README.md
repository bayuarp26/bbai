
# TikTok Tracking Website

This is a Node.js website that allows you to create tracking links from TikTok URLs. When someone clicks the tracking link, it requests permission to access their GPS location and captures their IP address. The location and IP data are sent to the server and logged.

## Features

- Create tracking links from TikTok URLs
- Track visitor GPS location (with permission)
- Track visitor IP address
- Redirect visitors to the original TikTok URL after tracking
- Simple and modern UI using Tailwind CSS, Google Fonts, and Font Awesome

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node package manager)

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/bayuarp26/bbai.git
cd bbai
```

2. Install dependencies:

```bash
npm install express uuid
```

3. Start the server:

```bash
node server.js
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

## Usage

- On the homepage, enter a TikTok URL and create a tracking link.
- Share the tracking link with others.
- When someone visits the tracking link, they will be asked to allow location access.
- The server logs the visitor's IP address and GPS location (if permission is granted).
- The visitor is then redirected to the original TikTok URL.

## Notes

- This project stores tracking data in memory and logs it to the console. For production use, consider storing data in a database.
- Ensure you have permission to track users' location and IP in compliance with privacy laws.

## Deploying on Vercel

You can deploy this project on Vercel as a serverless application.

### Steps to deploy

1. Install the Vercel CLI if you haven't already:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy the project:

```bash
vercel
```

4. Follow the prompts to complete the deployment.

The API routes are handled by serverless functions in the `api` directory, and static files are served from the `public` directory.

### Notes

- The in-memory storage means tracking data will not persist across serverless function invocations.
- For persistent storage, integrate a database or external storage service.

## License

This project is open source and available under the MIT License.
