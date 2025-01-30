// Component for not found Page
async function NotFoundPage() {
  // set page title
  const title = '404 | LUMINA';
  document.title = title;

  // other JavaScript Logics

  // return page's html
  return `
 <div class="flex-grow mx-auto px-4 py-16 flex flex-col items-center justify-center text-center bg-white/35 w-fit mb-11 rounded-3xl">
 <span class="text-red-500 text-xl mb-2 font-bold">Whoops!</span>
        <h1 class="text-9xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 class="text-4xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p class="text-xl text-gray-600 mb-2">Looks like this page went on vacation.</p>
        <p class="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div class="space-y-4">
            <a href="/" class="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition inline-block">Go Back Home</a>
        </div>
    </div>
`;
}

export default NotFoundPage;
