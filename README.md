# Taskursion

By: [SaahirM](https://github.com/SaahirM)

## Description
A task-tracking web app with the ability to organize tasks into endless layers of subtasks. This is a personal project accessible at [taskursion.vercel.app](https://taskursion.vercel.app/).

## Prerequisites
To get a demo of this project running on your local device, you will need:
- [Node.js](https://nodejs.org/)
- A [local MongoDB server](https://www.mongodb.com/docs/manual/installation/) or [cloud-hosted MongoDB service](https://www.mongodb.com/atlas/database)
- (Optional, for "Signup with Google") Google OAuth credentials from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- (Optional, for "Summarize with AI") An OpenAI API key from the [OpenAI Platform](https://platform.openai.com)

## Getting Started

Follow these steps to get the app running:

1. Make a copy of the file `.env.example` and name this copy `.env`.
1. Update `.env`.
    * Change the database connection URL value `MONGO_CONN_STR` so it points to your desired database.
    * Generate a secret for NextAuth `NEXTAUTH_SECRET` by running `openssl rand -base64 32` and copying the result into `.env`. Or run `npx auth secret`.
    * (Optional) Replace the Google OAuth values `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` with your own from the Google Cloud Console.
    * (Optional) Generate a random string by running `openssl rand -base64 32` and use it as `CRON_SECRET`
    * (Optional) Set `OPENAI_API_KEY` as your OpenAI API key
1. Launch a terminal.
1. Run `npm install` at the root project directory `/taskursion`.
1. Run `npm run build` to build the app.
1. Now run `npm start` to launch the built app.
1. Navigate to "http://localhost:3000" using a browser.

You should see the app's homepage, which looks like this:
![The application's homepage, which has "Taskursion" at the center of the screen in large font, and two smaller "Signup" and "Login" buttons](src/docs/homepage.png)

If your browser/device is set to light mode, this page will look different.

## Resources

### Built With

These are some of the development tools I used
- [Next.js](https://nextjs.org/), with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- [Material UI](https://mui.com/)
- [MongoDB's Nodejs Driver](https://www.mongodb.com/docs/drivers/node/current/)