window.randomPage = function () {
  const pages = [
    'Test%20Pages/page1.html',
    'Test%20Pages/page2.html',
    'Test%20Pages/page3.html',
    'Test%20Pages/page4.html',
    'Test%20Pages/page5.html',
    'Test%20Pages/page6.html',
    'Test%20Pages/page7.html',
    'Test%20Pages/page8.html'
  ];
  const i = Math.floor(Math.random() * pages.length);
  location.href = pages[i];
};

