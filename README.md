# To create a App

```
npx create-next-app@latest folder_name
```
# Full Stack Spotify Clone with Next.js 13.4 App Router: React, Tailwind, Supabase, PostgreSQL, Stripe

![Copy of Copy of Fullstack Twitter Clone](https://github.com/AntonioErdeljac/next13-spotify/assets/23248726/2722c7bd-2d8f-44a9-97b9-f2711a8d8b64)

For DEMO, use [Stripe Testing Cards](https://stripe.com/docs/testing)

This is a repository for a Full Stack Spotify Clone with Next.js 13.4 App Router: React, Tailwind, Supabase, PostgreSQL, Stripe

[VIDEO TUTORIAL](https://youtu.be/2aeMRB8LL4o)

Key Features:

- Song upload
- Stripe integration
- Tailwind design for sleek UI
- Tailwind animations and transition effects
- Full responsiveness for all devices
- Credential authentication with Supabase
- Github authentication integration
- File and image upload using Supabase storage
- Client form validation and handling using react-hook-form
- Server error handling with react-toast
- Play song audio
- Favorites system
- Playlists / Liked songs system
- Advanced Player component
- Stripe recurring payment integration
- How to write POST, GET, and DELETE routes in route handlers (app/api)
- How to fetch data in server React components by directly accessing the database (WITHOUT API! like Magic!)
- Handling relations between Server and Child components in a real-time environment
- Cancelling Stripe subscriptions

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-spotify.git
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



TODO :-

1. Add a edit button just in side of delete button to edit title,author and genre.
2. In delete song button, implement to delete the data from buckets as well.
3. add a file .txt upload option/any other alternative to upload lyrics and display it there . it will be a nullable filed.
3. Add a table for albBums, user can create their album. And when click on add to playlist button one modal will be shown with a dropdown of all the present albums and then user can add/remove music to/from playlist.
4. Add a slider to the music as well.
5. Add a filter option by geners
6. 