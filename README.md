# Lumina - Full Stack SPA Maker (by Kiarash Alizadeh)

Lumina is a lightweight and efficient framework for building full-stack single-page applications (SPAs) with ease.

## Installation and Setup

To create a new Lumina project, run:

```bash
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

```bash
npm start
```

Your Lumina app will be available at:

```
http://localhost:3000/
```

## Table of Contents

- [Frontend Development](#frontend-development)
  - [Components](#components)
  - [Nested Components](#nested-components)
  - [Routing](#routing)
  - [Layouts](#layouts)
  - [Loading Screen](#loading-screen)
  - [Styling](#styling)
  - [Dynamic URLs](#dynamic-urls)
  - [SPA Navigation](#spa-navigation)
- [Backend Development](#backend-development)
  - [Database Setup](#database-setup)
  - [HTTP and APIs](#http-and-apis)
  - [Models](#models)
  - [Middlewares](#middlewares)
  - [Environment Variables](#environment-variables)

## Frontend Development

### Components

Components in Lumina are JavaScript functions that return HTML. All pages are created with JS and inserted into a div with `id="lumina__root"` in the HTML file:

```html
<div id="lumina__root">
  <!-- Content will be dynamically loaded here -->
</div>
```

Basic component example (HomePage.js):

```javascript
async function HomePage() {
  // set page title
  const title = 'HomePage | LUMINA';
  document.title = title;

  // other JavaScript Logics

  return `
    <div>
      Home page of Lumina
    </div>
  `;
}

export default HomePage;
```

Component naming rules:

- File name must match function name
- Start with uppercase letter
- Must use `export default`

For components that need to fetch data:

```javascript
async function TestPage() {
  // set page title
  const title = 'Test | LUMINA';
  document.title = title;

  const res = await fetch(
    `http://localhost:3000/api/user?api_token=tk_live_abc123`
  );

  const data = await res.json();
  console.log('data: ', data);

  return `
    <div class="text-center text-5xl font-bold mb-10">
      Page Id is: <span class="text-amber-500">${id}</span>
    </div>
  `;
}

export default TestPage;
```

Note: Always include `?api_token=tk_live_abc123` in API fetch requests due to the apiTokenAuth middleware.

### Nested Components

You can create reusable components in the `components/module` directory. For organization, group related components in subdirectories:

Example of using nested components:

```javascript
import Comments from '../module/home/Comments.js';
import FAQ from '../module/home/FAQ.js';
import Price from '../module/home/Price.js';

async function HomePage() {
  const title = 'Home | LUMINA';
  document.title = title;

  return `
    <div class="container mx-auto px-4 py-16">
      <section class="text-center mb-16">
        <h1 class="text-5xl font-bold text-gray-800 mb-4">Create Stunning SPAs with LUMINA</h1>
        <p class="text-xl text-gray-600 mb-8">The next-generation SPA maker for modern web applications</p>
        <a href="#" class="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition">Get Started</a>
      </section>

      <!-- using home page components -->
      ${Comments()}
      ${Price()}
      ${FAQ()}

      <section class="text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Ready to Illuminate Your Web Projects?</h2>
        <p class="text-xl text-gray-600 mb-8">Join thousands of developers who trust LUMINA for their SPA needs</p>
        <a href="https://github.com/kiarashAlizadeh/create-lumina" class="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition">Start Coding</a>
      </section>
    </div>
  `;
}

export default HomePage;
```

Example nested component (Comments.js):

```javascript
function Comments() {
  return `
    <!-- Testimonial Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Users Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <p class="text-gray-600 mb-4">"LUMINA has revolutionized the way we build SPAs. It's fast, intuitive, and the results are stunning!"</p>
          <p class="font-semibold text-gray-800">- Sarah Johnson, Frontend Developer</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <p class="text-gray-600 mb-4">"I've never been able to create such beautiful and responsive SPAs so quickly. LUMINA is a game-changer!"</p>
          <p class="font-semibold text-gray-800">- Michael Chen, UX Designer</p>
        </div>
      </div>
    </section>
  `;
}

export default Comments;
```

### Routing

Define routes in `routes.js`:

```javascript
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

Route configuration:

- `path`: URL path after domain
- `component`: Component name (must exist in components/pages)
- `css`: Optional array of CSS files to link
- 404 page shows for undefined routes

### Layouts

Main layout configuration in `components/layout/layout.js`:

```javascript
import Header from './Header.js';
import Footer from './Footer.js';

async function Layout(PageContent) {
  const HeaderContent = await Header();
  const FooterContent = await Footer();

  return `${HeaderContent}<main>${PageContent}</main>${FooterContent}`;
}

export default Layout;
```

Header and footer components are in:

- `components/layout/header.js`
- `components/layout/footer.js`

It's recommended to put header and footer styles in `assets/css/index.css` to avoid duplicate styles.

### Loading Screen

Lumina includes a default loading screen that appears while content is loading, especially useful during API fetches. Customize the loader in:

- HTML: `components/layout/loader.js`
- CSS: `assets/css/index.css`

### Styling

Lumina supports multiple styling approaches:

1. **Global CSS**: Use `assets/css/index.css` for site-wide styles

2. **Page-specific CSS**: Create files in `assets/css/pageStyle/` and link them in routes.js

3. **Sass**: Write in `assets/sass/` - automatically compiled to CSS

4. **Tailwind CSS**: Pre-configured and ready to use:

```html
<div class="bg-amber-500">Lumina is using TailwindCSS!</div>
```

Note: The `css` property in routes is optional, especially if you're using Tailwind CSS.

### SPA Navigation

Use regular `<a>` tags for navigation. Lumina handles route changes without page refreshes:

```html
<a href="/">Home</a>
```

### Dynamic URLs

Create dynamic URLs using hash fragments:

```html
<a href="/test#7775">Test Page</a>
```

Access the dynamic ID in your component:

```javascript
async function TestPage() {
  const title = 'Test | LUMINA';
  document.title = title;

  // dynamic id in url
  const id = window.location.toString().split('#')[1];

  return `
    <div>
      test Id: ${id}
    </div>
  `;
}
```

## Backend Development

### HTTP and APIs

HTTP Methods:

- `GET`: Retrieve data
- `POST`: Create new data
- `PUT`: Update entire resource
- `PATCH`: Partial update
- `DELETE`: Remove data

HTTP Status Codes:

- 200: OK (Success)
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

For complete status code reference, visit [MDN HTTP Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

### Database Setup

Lumina uses MongoDB with Mongoose by default. Database connection is configured in `lumina.config.js`:

```javascript
async function DBConnect() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env file');
    return;
  }

  mongoose.connect(DATABASE_URL);

  const db = mongoose.connection;

  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('successfully connected to the DataBase!'));
}
```

### Models

Define models in `api/models/` with uppercase naming convention:

```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'USER',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

export default mongoose.model('User', userSchema);
```

### API Routes

Create API routes in `api/routes/`. The filename determines the endpoint (e.g., `user.js` creates `/api/user`):

```javascript
import express from 'express';
const router = express.Router();
import User from '../models/User.js';

// Getting all
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post('/', async (req, res) => {
  try {
    const {
      name,
      familyName,
      userName,
      email,
      birthDate,
      pass,
      gender,
      phone,
      favoriteTeam,
    } = req.body;

    const newUser = await User.create({
      name,
      familyName,
      userName,
      email,
      birthDate,
      pass,
      gender,
      phone,
      favoriteTeam,
    });

    res.status(201).json({ message: 'user created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    // Update fields based on request body
    if (req.body.name) user.name = req.body.name;
    if (req.body.familyName) user.familyName = req.body.familyName;
    if (req.body.userName) user.userName = req.body.userName;
    if (req.body.email) user.email = req.body.email;

    await user.save();
    res.status(201).json({ message: 'user Updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
```

### Middlewares

Middlewares are functions that run between request and response. They can:

- Authenticate requests
- Log information
- Modify requests/responses
- Handle errors

Create middlewares in `api/middleware/` with numbered prefixes for execution order(e.g., `02-loggerTest.js` runs after `01-apiTokenAuth.js`):

```javascript
export const requestLogger = () => (req, res, next) => {
  console.log('< -- middleware logger 01 -- >');
  next();
};
```

API Token Authentication:
Configure tokens in `lumina.config.js`:

```javascript
const API_TOKENS = new Map([
  [
    'tk_live_abc123',
    {
      name: 'Production App',
      permissions: ['read', 'write'],
      isActive: true,
      rateLimit: 1000, // requests per hour
    },
  ],
  [
    'tk_test_xyz789',
    {
      name: 'Test App',
      permissions: ['read'],
      isActive: true,
      rateLimit: 100,
    },
  ],
]);
```

### Environment Variables

Store sensitive configuration in `.env`:

```plaintext
DATABASE_URL="mongodb://127.0.0.1:27017/lumina"
```

The `.env` file should be in the project root and is used for:

- Database connection strings
- API keys
- Sensitive configuration
- Environment-specific settings

Never commit the `.env` file to version control.

---

Happy coding with Lumina! ❤️
