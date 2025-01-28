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
    <div class="home-page">
      <header class="home-header">
        <h1>Welcome to LUMINA</h1>
        <p>Your complete full-stack solution for building powerful SPAs</p>
      </header>

      <section class="features-section">
        <h2 class="features-title">Why Choose LUMINA?</h2>
        <div class="features-list">
          ${features
            .map(
              (feature) => `
            <div class="feature-item">
              <h3>${feature.title}</h3>
              <p>${feature.description}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <section class="cta-section">
        <h2 class="cta-title">Get Started with LUMINA Today</h2>
        <a href="/signup" class="cta-button">Start Building</a>
      </section>
    </div>
  `;
}

export default HomePage;
