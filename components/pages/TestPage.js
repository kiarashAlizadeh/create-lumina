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
<div class="text-center text-5xl font-bold ">
  Page Id is: <span class="text-amber-500">${id}</span>
</div>
`;
}

export default TestPage;
