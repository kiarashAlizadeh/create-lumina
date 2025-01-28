// Component for not found Page
async function NotFoundPage() {
  // set page title
  const title = '404 | LUMINA';
  document.title = title;

  // other JavaScript Logics

  // return page's html
  return `
<div class="not-found-page">
      <span class="not-found-message">Whoops!</span>
      <h2 class="not-found-title">404 - Page Not Found</h2>
      <p class="not-found-description">Looks like this page went on vacation.</p>
      <a href="/" class="back-home">Back to Home Page</a>
</div>
`;
}

export default NotFoundPage;
