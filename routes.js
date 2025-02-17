// Define routes
const mainRoutes = [
  { path: '/', component: 'HomePage' },
  { path: '/test', component: 'TestPage', css: ['test', 'testSass'] },
];

// notFound Page route
const notFoundRoute = {
  path: '/404',
  component: 'NotFoundPage',
  css: ['notFound'],
};

export { mainRoutes, notFoundRoute };
