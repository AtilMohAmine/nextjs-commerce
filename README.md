# Next.js Commerce
<div align="center"> 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=nextjs-commerce)

</div>

Next.js Commerce is a modern and flexible e-commerce application built with Next.js 13, App Router, Tailwind CSS, Prisma, and MongoDB. This project provides a solid foundation for creating your own e-commerce website.

<br />
<p align="center">
   <img src="https://github.com/AtilMohAmine/nextjs-commerce/assets/86023602/c148c635-19fe-407f-9cca-d146f77c212b">
</p>

## Features

- **SEO-ready:** Next.js is also SEO-friendly, so your e-commerce site will rank well in search engine results pages (SERPs).
- **Internationalization:** Next.js makes it easy to internationalize your e-commerce site, so you can sell to customers all over the world.
- **Responsive:** Next.js apps are responsive by default, so they look great on all devices, from phones to tablets to desktop computers.
- **UI components:** This app includes a variety of pre-built UI components, such as product cards, shopping carts, and checkout forms, to make it easy to get started with your e-commerce site.

- **Prisma:** Use Prisma as the database ORM (Object-Relational Mapping) to interact with your MongoDB database.

## Getting Started

Follow these steps to set up and run the Next.js Commerce app on your local development environment:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/atilmohamine/nextjs-commerce.git
   cd nextjs-commerce
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set up Environment Variables:**

   Create a `.env` file in the project root and add the necessary environment variables, such as your MongoDB connection string and any secret keys.

   ```plaintext
   DATABASE_URL=your-mongodb-connection-string
   PAYPAL_CLIENT_ID=your-paypal-client-id
   PAYPAL_CLIENT_SECRET=your-paypal-client-secret
   ```

4. **Database Migration:**

   Run Prisma migrations to set up the database schema.

   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Run the Development Server:**

   Start the development server.

   ```bash
   npm run dev
   ```

6. **Access the Application:**

   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Next.js Commerce app.

## Docker

If you prefer to run the Next.js Commerce app using Docker, follow these additional steps:

1. **Build Docker Image:**

   Before building the Docker image, open the `Dockerfile` in the project root and ensure the environment variables are set correctly. Update the following section with your MongoDB connection string, PayPal client ID, and PayPal client secret:

   ```Dockerfile
   # Set environment variables
   ENV DATABASE_URL=your-mongodb-connection-string \
       PAYPAL_CLIENT_ID=your-paypal-client-id \
       PAYPAL_CLIENT_SECRET=your-paypal-client-secret
   ```

   Replace your-mongodb-connection-string, your-paypal-client-id, and your-paypal-client-secret with your actual MongoDB connection string and PayPal API credentials.

   Once updated, build the Docker image.

   ```bash
   docker build -t nextjs-commerce .
   ```

2. **Run Docker Container:**

   ```bash
   docker run -e NODE_ENV=production -p 3000:3000 nextjs-commerce
   ```

2. **Access the Application:**

   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Next.js Commerce app.

## Deployment

To deploy the Next.js Commerce app, follow the deployment guidelines for your chosen hosting platform. Some popular options include Vercel, Netlify, and AWS.

## Contributing

Contributions to this project are welcome! If you have any suggestions, feature requests, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/AtilMohAmine/nextjs-commerce/blob/main/LICENSE) file for details.
