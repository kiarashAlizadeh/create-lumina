// Component for Test Page
async function TestPage() {
  // set page title
  const title = 'Test | LUMINA';
  document.title = title;

  // dynamic id in url
  const id = window.location.toString().split('#')[1];

  // other JavaScript Logics

  // return page's html
  return `
<div>
  test Id: ${id}
</div>
`;
}

export default TestPage;
