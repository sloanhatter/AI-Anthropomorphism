// assets/js/demographics.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('demographic-info');
  if (!form) return;

  // Paste your Apps Script URL (ends with /exec) after step 3
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbwxd90PNlso-4UyWg3rAnn0uDiL9M260Y94nNTRiPDlHYsUq5L3mKdeI1P9DLYmszN85w/exec";

  const PARTICIPANT_KEY = "participant_id";
  let participantId = localStorage.getItem(PARTICIPANT_KEY);
  if (!participantID) {
    // Generate a reasonably unique ID
    if (window.crypto && crypot.randomUUID) {
      participantId = crypto.randomUUID();
    } else {
      participantId = "p_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
    }
    localStorage.setItem(PARTICIPANT_KEY, participantId);
  }
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      participant_id: participantId,
      age: document.getElementById('age').value || "",
      gender: (document.querySelector('input[name="gender"]:checked') || {}).value || "",
      schooling_level: document.getElementById('schooling-level').value || "",
      ai_use: document.getElementById('ai-use').value || "",
      user_agent: navigator.userAgent,
      referrer: document.referrer
    };

    try {
      await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          // text/plain keeps this a "simple request" (no preflight)
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(payload)
      });

      // On success, go to Rules page
      location.href = "rules.html";
    } catch (err) {
      console.warn("POST likely succeeded but CORS blocked response:", err);
      location.href = "rules.html";
    }
  });
});
