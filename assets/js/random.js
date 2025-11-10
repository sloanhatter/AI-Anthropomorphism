// assets/js/random.js

window.randomPage = async function () {
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
  const chosen = pages[i];

  const ENDPOINT = "https://script.google.com/macros/s/AKfycbwxd90PNlso-4UyWg3rAnn0uDiL9M260Y94nNTRiPDlHYsUq5L3mKdeI1P9DLYmszN85w/exec";

  const participantId = localStorage.getItem('participant_id') || '';

  const payload = {
    event_type: "assignment",
    participant_id: participantId,
    assigned_page: chosen,
    assigned_timestamp: new Date().toISOString()
  };

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn("Assignment POST failed or CORS-blocked:", err);
    // Even if we can't read the response, the request usually still reaches Apps Script.
  }

  // Finally send the participant to their assigned test page
  window.location.href = encodeURI(chosen);
};
