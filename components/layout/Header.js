// Component for header
async function Header() {
  let eventAdded = false; // Flag to check if the event listener is already added
  let isActive = false; // State to track whether the menu is open or not

  // Function to handle menu toggle
  window.menuToggleHandler = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
      // For the first click, toggle the state and menu
      if (!eventAdded) {
        isActive = !isActive; // Toggle the state
        navLinks.classList.toggle('active', isActive);

        // Add event listener for subsequent clicks
        menuToggle.addEventListener('click', () => {
          isActive = !isActive; // Toggle the state
          navLinks.classList.toggle('active', isActive);
        });

        eventAdded = true; // Mark event as added
      }
    }
  };

  const testId = 5765765;

  return `
    <header class="header">
      <nav class="nav">
        <div class="logo">
          <a href="/">LUMINA</a>
        </div>
        <button class="menu-toggle" onclick="menuToggleHandler()">
          ☰
        </button>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/test#${testId}">TestPage</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  `;
}

export default Header;
