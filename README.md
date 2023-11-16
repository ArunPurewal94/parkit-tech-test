## Getting Started

To run locally you need to install the dependencies for both projects, so CD into the client and server directory and for both run:

- npm

```sh
npm install
```

- pnpm

```sh
pnpm install
```

Then CD into both the client and server directory and run

- npm

```sh
npm run dev
```

- pnpm

```sh
pnpm run dev
```

### Server Setup

You need to change the value for the .env example to your current MongoDB URL

```js
MONGO_URL=your mongo url
```

Then it all should be good to go!

## Usage

You will see a list of pending Todos on initial startup of the application and the form to add a todo.

If it's the first time running it will be blank with the title and simply the form.

You can view completed todos by clicking the completed todos in the navbar and then toggle back to pending todos.

A user can create, edit, and delete a todo.

A user can also mark a todo as complete or pending. However, when the todo is marked as complete they cannot edit but still delete it.
