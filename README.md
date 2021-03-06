<p align="center">
<img src="https://i.imgur.com/7pmIcEP.png" alt="cubedeck-img">
</p>
<p align="center">
<img src="https://api.netlify.com/api/v1/badges/ccb24bd7-1849-451c-b725-ed327f6878d7/deploy-status" />
<img src="https://img.shields.io/github/stars/carrotfarmer/cubedeck" />
<img src="https://img.shields.io/github/license/carrotfarmer/cubedeck" />
</p>
<p align="center">
<h1>cubedeck</h1>
<p>Taking your cubing skills to the moon! 🚀🌔</p>
</p>

The app is live at [cubedeck.netlify.app](https://cubedeck.netlify.app)

## About

Cubedeck is a web application that is designed to assist cubers to keep track of their progress by and improve themselves by:

- helping them easily log their solve times and obtaining stats about their solves
- creating practice sessions to segregate their solves
- creating and joining friend groups, to compete for the best solves

## Screenshots

![session screenshot](https://i.imgur.com/vcb3eZU.png)
![groups screenshot](https://i.imgur.com/8I86LAG.png)
![groups indiv ss](https://i.imgur.com/BpyZjCc.png)
![home page](https://i.imgur.com/pOImEEM.png)

## Technologies

- React
- Next.js
- ChakraUI
- TypeScript
- Firebase (Auth/Firestore)
- Netlify/Netlify Functions (Hosting)

## Project Structure

The code base mainly contains React components in the `components` directory, and Next.js pages in the `pages` directory.

### Components

Most of the code lies in the `components` folder in `src`.

- [`groups`](https://github.com/carrotfarmer/cubedeck/tree/main/src/components/groups) - Contains components which is involved in managing groups (creating, leaderboard etc.)
- [`lpg`](https://github.com/carrotfarmer/cubedeck/tree/main/src/components/lpg) - Landing page
- [`sessions`](https://github.com/carrotfarmer/cubedeck/tree/main/src/components/sessions) - Contains components involved in managing individual user sessions.
- [`solves`](https://github.com/carrotfarmer/cubedeck/tree/main/src/components/solves) - Manages solves in a user session
- [`std`](https://github.com/carrotfarmer/cubedeck/tree/main/src/components/std) - Standard components like navbar etc.
- [`utils`](https://github.com/carrotfarmer/cubedeck/tree/main/src/components/utils) - Utility components

### Pages

- [`index`](https://github.com/carrotfarmer/cubedeck/blob/main/src/pages/index.tsx) - Home route
- [`groups`](https://github.com/carrotfarmer/cubedeck/blob/main/src/pages/groups.tsx) - Groups route; contains all the groups a user has + buttons for creating and joining a group
- [`session/[sessionId]`](https://github.com/carrotfarmer/cubedeck/blob/main/src/pages/session/%5BsessionId%5D.tsx) - Individual session route
- [`group/[groupId]`](https://github.com/carrotfarmer/cubedeck/tree/main/src/pages/group) - Individual group route
- [`guide`](https://github.com/carrotfarmer/cubedeck/tree/main/src/pages/guide.tsx) - The guide page

## Running Locally

- Clone the repo

```sh
git clone https://github.com/carrotfarmer/cubedeck.git
```

- Install all dependencies

```sh
yarn
```

- Create a firebase project
- Add your firebase credentials to a `.env` file like so:

> Check out `.env.example`

```env
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_CENTER_ID=
NEXT_PUBLIC_APP_ID=
```

- Run the app

```sh
yarn dev
```
