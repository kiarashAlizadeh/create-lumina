// Component for Test Page
async function TestPage() {
  // set page title
  const title = 'Test | LUMINA';
  document.title = title;

  // dynamic id in url
  const id = window.location.toString().split('#')[1];

  if (id) {
    const res = await fetch(
      `http://localhost:3000/api/user/${id}?api_token=tk_live_abc123`
    );

    const data = await res.json();
    console.log('data: ', data);
  }

  // other JavaScript Logics

  // return page's html
  return `
<div class="text-center text-5xl font-bold mb-10">
  Page Id is: <span class="text-amber-500">${id}</span>
</div>
`;
}

export default TestPage;
