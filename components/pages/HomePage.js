import Comments from '../module/home/Comments.js';
import FAQ from '../module/home/FAQ.js';
import Price from '../module/home/Price.js';

// Component for Home Page
async function HomePage() {
  // set page title
  const title = 'Home | LUMINA';
  document.title = title;

  // Feature description for LUMINA
  const features = [
    {
      title: 'Full-Stack SPA Builder',
      description:
        'LUMINA is a complete solution for building Single Page Applications, handling both the frontend and backend seamlessly.',
    },
    {
      title: 'Dynamic Routing',
      description:
        'Easily implement dynamic routing without page reload, providing a smoother user experience in your SPA.',
    },
    {
      title: 'Real-Time Data Handling',
      description:
        'Handle real-time data processing with integrated WebSocket support, making your app highly interactive and responsive.',
    },
    {
      title: 'Modular Backend',
      description:
        'Create and manage your backend logic with modular components, making backend development faster and more organized.',
    },
    {
      title: 'Customizable UI Components',
      description:
        'LUMINA provides customizable UI components that you can easily integrate into your app, reducing development time.',
    },
    {
      title: 'Powerful Database Integration',
      description:
        'Connect your application to databases seamlessly, supporting both SQL and NoSQL integrations for scalable applications.',
    },
  ];

  // return page's html
  return `
     <div class="container mx-auto px-4 py-16">
        <section class="text-center mb-16">
            <h1 class="text-5xl font-bold text-gray-800 mb-4">Create Stunning SPAs with LUMINA</h1>
            <p class="text-xl text-gray-600 mb-8">The next-generation SPA maker for modern web applications</p>
            <a href="#" class="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition">Get Started</a>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            ${features
              .map(
                (feature) => `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${feature.title}</h3>
                <p class="text-gray-600">${feature.description}</p>
            </div>
          `
              )
              .join('')}
        </section>

        <section class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">See LUMINA in Action</h2>
            <div class="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <p class="text-gray-500 text-lg">Video Placeholder</p>
            </div>
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
