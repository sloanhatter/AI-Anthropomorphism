window.randomPage = function () {
  const pages = [
    'Test Pages/page1.html',
    'Test Pages/page2.html',
    'Test Pages/page3.html',
    'Test Pages/page4.html',
    'Test Pages/page5.html',
    'Test Pages/page6.html',
    'Test Pages/page7.html',
    'Test Pages/page8.html'
  ];
  const i = Math.floor(Math.random() * pages.length);
  location.href = encodeURI(pages[i]); // encodes the space to %20
};
