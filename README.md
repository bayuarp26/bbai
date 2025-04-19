
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

1. Set up a MongoDB Atlas cluster (free tier available) and create a database.

2. Create a `.env` file in the root of the project with the following content:

```
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
```

3. Install the Vercel CLI if you haven't already:

```bash
npm install -g vercel
```

4. Login to Vercel:

```bash
vercel login
```

5. Deploy the project:

```bash
vercel
```

6. Set the environment variables in the Vercel dashboard for your project (`MONGODB_URI` and `MONGODB_DB`).

The API routes are handled by serverless functions in the `api` directory, and static files are served from the `public` directory.

### Notes

- This project now uses MongoDB Atlas for persistent storage, which is suitable for serverless environments like Vercel.
- Ensure your MongoDB connection string and database name are correctly set in environment variables.
- For local development, create a `.env` file and use a package like `dotenv` to load environment variables.

## License

This project is open source and available under the MIT License.
