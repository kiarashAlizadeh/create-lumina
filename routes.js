// Define routes
const mainRoutes = [
  { path: '/', component: 'HomePage', css: ['home'] },
  { path: '/test', component: 'TestPage', css: ['test', 'testSass'] },
];

// notFound Page route
const notFoundRoute = {
  path: '/404',
  component: 'NotFoundPage',
  css: ['notFound'],
};

export { mainRoutes, notFoundRoute };
