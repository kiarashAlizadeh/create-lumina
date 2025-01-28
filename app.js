// Get DOM elements
const root = document.getElementById('lumina__root');

// import lumina app routes
import { mainRoutes, notFoundRoute } from './routes.js';

// Import Layout and Loader components
import Layout from './components/layout/Layout.js';
import Loader from './components/layout/Loader.js';

// Wait for DOMContentLoaded event before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Initial load of the content based on the current URL path
  navigateToPage(window.location.pathname);

  // Function to navigate to a page
  async function navigateToPage(path) {
    // find route object for this path
    const route = findRoute(path);

    // loadCssFile for this path
    loadCssFile(route.css);

    // Import the module dynamically based on the route
    await importModule(route.component);
  }

  // Function to find the route for a given path
  function findRoute(path) {
    // If there is a '#' in the path, ignore everything after it
    const cleanPath = path.split('#')[0];

    // Find the route by comparing the cleaned path
    const matchedRoute = mainRoutes.find((route) => route.path === cleanPath);

    // Check if the matched route exists, otherwise return the notFoundRoute
    return matchedRoute || notFoundRoute;
  }

  // Function to load CSS file dynamically
  function loadCssFile(cssFile) {
    if (cssFile) {
      const cssPath = `./assets/css/pageStyles/${cssFile}.css`;

      // Remove the Old CSS file if it exists
      const existingStyle = document.getElementById('dynamic-style');
      if (existingStyle) {
        existingStyle.parentNode.removeChild(existingStyle);
      }

      // add css file for req page
      const style = document.createElement('link');
      style.id = 'dynamic-style';
      style.rel = 'stylesheet';
      style.href = cssPath;
      document.head.appendChild(style);
    } else {
      // Remove the Old CSS file if it exists
      const existingStyle = document.getElementById('dynamic-style');
      if (existingStyle) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    }
  }

  // Function to import module dynamically
  async function importModule(moduleFile) {
    // Show loader
    const loaderContent = await Loader();
    root.innerHTML = loaderContent;

    // load the req page component
    const module = await import(`./components/pages/${moduleFile}.js`);

    // Dynamically call the function with the same name as the module file
    const PageContent = await (module[moduleFile] || module.default)();

    const layout = await Layout(PageContent);

    // Set page content inside root container and remove loader
    root.innerHTML = layout;
  }

  // Handle navigation changes for spa
  document.addEventListener('click', (event) => {
    if (
      event.target.tagName === 'A' &&
      event.target.getAttribute('href').startsWith('/')
    ) {
      event.preventDefault();
      const path = event.target.getAttribute('href');
      navigateToPage(path);
      history.pushState(null, null, path);
    }
  });

  // Handle back and forward buttons for spa
  window.addEventListener('popstate', () => {
    navigateToPage(window.location.pathname);
  });
});
