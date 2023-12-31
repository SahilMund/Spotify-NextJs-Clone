# Spotify Clone - Next.js

- Developed a full-stack Spotify Clone using Next.js 13.4, React, Tailwind, Supabase, PostgreSQL, and Stripe integration, providing users with a seamless music streaming experience, user authentication, and secure payment processing.
- Implemented features such as song uploading, user authentication through Supabase and GitHub, file and image uploading using Supabase storage, playlist and liked songs management, advanced player component, responsive UI design with Tailwind, and integration with Stripe for recurring payments and subscription management.
- Implemented Stripe subscription cancellation functionality for the Full Stack Spotify Clone project.
- Integrated with the Stripe API to handle subscription management and cancellation requests.

# To create a App

```
npx create-next-app@latest folder_name
```
# Full Stack Spotify Clone with Next.js 13.4 App Router: React, Tailwind, Supabase, PostgreSQL, Stripe


For DEMO, use [Stripe Testing Cards](https://stripe.com/docs/testing)

This is a repository for a Full Stack Spotify Clone with Next.js 13.4 App Router: React, Tailwind, Supabase, PostgreSQL, Stripe


Key Features:

- Song upload
- Stripe integration
- Tailwind design for sleek UI
- Tailwind animations and transition effects
- Full responsiveness for all devices
- Credential authentication with Supabase
- Github authentication integration
- File and image upload using Supabase storage (User can upload image, songs and lyrics)
- Client form validation and handling using react-hook-form
- Server error handling with react-toast
- Play song audio
- Favorites system
- Playlists / Liked songs system
- Advanced Player component
- Stripe recurring payment integration
- How to write POST, GET, and DELETE routes in route handlers (app/api)
- How to fetch data in server React components by directly accessing the database 
- Handling relations between Server and Child components in a real-time environment
- User can delete their added songs
- User can create their Playlist and add/remove songs to the playlist.
- Disable liked page when user is not logged In --done
- Playlist link sharing feature
- Cancelling Stripe subscriptions


### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/SahilMund/Spotify-NextJs-Clone.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Add SQL Tables
Use `database.sql` file, create songs and liked_songs table (there is a video tutorial)

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |






