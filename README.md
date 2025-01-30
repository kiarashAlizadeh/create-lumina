# Lumina - Full Stack SPA Maker (by Kiarash Alizadeh)

Lumina is a lightweight and efficient framework for building full-stack single-page applications (SPAs) with ease.

## Installation

To create a new Lumina project, run:

```sh
npx create-lumina my-lumina
```

- `my-lumina` is the folder name where the project will be created.
- You can omit the folder name and use:

  ```sh
  npx create-lumina
  ```

  This will create a default folder named `my-lumina-app`.

- To install Lumina in the current directory, use:

  ```sh
  npx create-lumina .
  ```

## Usage

After the installation is complete, when you see:

```sh
Happy coding with Lumina! 🎉
```

Run the following command to start the development server:

```sh
npm start
```

By default, Lumina runs on:

```
http://localhost:3000/
```

## Table of Contents

- [Configuration](#configuration)
  - [Database Connection](#database-connection)
  - [Server Port](#server-port)
  - [API Tokens](#api-tokens)
- [Frontend Development](#frontend-development)
  - [Creating Components](#creating-components)
  - [Routing](#routing)
  - [404 Not Found Page](#404-not-found-page)
  - [SASS Support](#sass-support)
  - [Tailwind CSS](#tailwind-css)
  - [Navigation](#navigation)
  - [Dynamic URL Parameters](#dynamic-url-parameters)
- [Backend Development](#backend-development)

## Configuration

### Database Connection

Database settings are managed in `lumina.config.js`. By default, Lumina connects to MongoDB, but you can change it to any database of your choice:

```js
async function DBConnect() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env file');
    return;
  }

  mongoose.connect(DATABASE_URL);
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Successfully connected to the database!'));
}
```

### Server Port

Change the port in `lumina.config.js`:

```js
const port = 3000;
```

### API Tokens

Lumina provides API token authentication in `01-apiTokenAuth.js`. Tokens can be stored in `.env` or in a database for better security:

```js
const API_TOKENS = new Map([
  [
    'tk_live_abc123',
    {
      name: 'Production App',
      permissions: ['read', 'write'],
      isActive: true,
      rateLimit: 1000,
    },
  ],
  [
    'tk_test_xyz789',
    { name: 'Test App', permissions: ['read'], isActive: true, rateLimit: 100 },
  ],
]);
```

Example API calls:

```sh
curl http://localhost:3000/api/data
curl -H "X-API-Token: tk_live_abc123" http://localhost:3000/api/data
curl "http://localhost:3000/api/data?api_token=tk_live_abc123"
```

## Frontend Development

### Creating Components

Each component is a JavaScript function that returns an HTML template:

```js
async function HomePage() {
  const title = 'HomePage | LUMINA';
  document.title = title;
  return `
    <div>
      Home page of Lumina
    </div>
  `;
}
export default HomePage;
```

- The function name must match the file name.
- Export the function using `export default`.
- Use `async` if you need to fetch data.
- Set the page title with `document.title`.

### Routing

Routes are defined in `routes.js`:

```js
const mainRoutes = [
  { path: '/', component: 'HomePage', css: ['home'] },
  { path: '/test', component: 'TestPage', css: ['test', 'testSass'] },
];

const notFoundRoute = {
  path: '/404',
  component: 'NotFoundPage',
  css: ['notFound'],
};
export { mainRoutes, notFoundRoute };
```

- The `path` defines the route.
- The `component` must match a JS file in `components/pages`.
- The `css` array links styles from `assets/css/pageStyle`.

### 404 Not Found Page

If an unknown route is accessed, the `404` page is shown. You can customize its styles and component but **do not change**:

```js
const notFoundRoute = {
  path: '/404',
  component: 'NotFoundPage',
  css: ['notFound'],
};
```

### SASS Support

Write your SASS files in `assets/sass`. Lumina automatically compiles them into `assets/css/pageStyle`, making them available in `routes.js`:

```js
{ path: '/', component: 'HomePage', css: ['home'] }
```

### Tailwind CSS

Tailwind is pre-configured. Simply use class names in HTML:

```html
<div class="bg-amber-500">Lumina is using Tailwind CSS!</div>
```

### Navigation

Use `<a>` tags for navigation:

```html
<a href="/">Home</a> <a href="/test">Test Page</a>
```

- Navigation is handled SPA-style (no page reload).

### Dynamic URL Parameters

To use dynamic values in URLs, append them after `#`:

```html
<a href="/test#7775">Test Page</a>
```

Retrieve the value in JavaScript:

```js
const id = window.location.toString().split('#')[1];
```

## Backend Development

Lumina provides an API backend that seamlessly integrates with the frontend. More documentation on backend APIs will be provided soon.

---

For more details, visit the official Lumina documentation.

Happy coding with Lumina! 🎉
