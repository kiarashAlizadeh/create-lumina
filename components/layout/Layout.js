import Header from './Header.js';
import Footer from './Footer.js';

async function Layout(PageContent) {
  // load header and footer from header and footer components
  const HeaderContent = await Header();
  const FooterContent = await Footer();

  return `${HeaderContent}<main>${PageContent}</main>${FooterContent}`;
  // return '2';
}

export default Layout;
