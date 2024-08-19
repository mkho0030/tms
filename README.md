## FIT3163 Task Management System

This is a task management system that showcases the team's understanding to develop and launch a project under FIT3163

## How to use

### Installing necessary libraries

Install neccessary libraries using [pnpm](https://pnpm.io) with this command

```
pnpm i
```

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

- `NEXT_PUBLIC_FIREBASE_[...]` - Your firebase service account details. Please read [Firebase Initalization](https://firebase.google.com/docs/web/setup#add-sdk-and-initialize) for more information.

- `NEXT_PUBLIC_APP_URL` - Your domain url to access the web application

- `ENFORCE_MIDDLEWARE` - Setting this variable to `false` allows for authentication bypass to access the app's APIs

### Run Next.js in development mode

Lastly, run the dev environment using the command below:

```
pnpm next dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

## Folder/File structure

Here are some key folders to allow you to better understand the app's file structure.

- `components` - Folder that store the Frontend UI and data schema
- `logic` - Stores both custom React Hooks and Context. Which allow for the reuse of frontend logic and manage global states. [Click here for more info](https://react.dev/reference/react/hooks)
- `pages` - Stores both frontend and backend code that will be runned by Nextjs. The `api` folder stores the backend code while the rest of the files are the frontend code. The folder structure has to be strictly followed as this would affect on the app's routing functions [Read here on how routing working in Nextjs](https://nextjs.org/docs/getting-started/project-structure) [Refer to PAGES ROUTER]
- `utils` - Stores any utility function and functions that connect the app to third party services like Mongodb and Firebase.

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
