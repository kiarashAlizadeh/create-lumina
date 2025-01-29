// Component for footer
async function Footer() {
  return `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
        <img src="../../assets/images/lumina-icon.webp" class="lumina-icon" alt="lumina" />
          <h3 class="footer-title">LUMINA</h3>
          <p class="footer-description">Bringing light to your projects with our expertise.</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/test#7775">Test Page</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a href="https://facebook.com" target="_blank" aria-label="Facebook">📘</a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter">🐦</a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram">📸</a>
            <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">🔗</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 LUMINA. All rights reserved.</p>
      </div>
    </footer>
  `;
}

export default Footer;
