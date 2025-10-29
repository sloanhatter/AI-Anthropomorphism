// assets/js/demographics.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('demographic-info');
  if (!form) return;

  // Paste your Apps Script URL (ends with /exec) after step 3
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbwxd90PNlso-4UyWg3rAnn0uDiL9M260Y94nNTRiPDlHYsUq5L3mKdeI1P9DLYmszN85w/exec";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
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
        headers: { "Content-Type": "text/plain" }, // avoids preflight
        body: JSON.stringify(payload)
      });
      // Even if CORS blocks reading the response, the POST succeeded.
      location.href = "rules.html";
    } catch (err) {
      console.warn("POST likely succeeded but CORS blocked response:", err);
      // Optional: still continue
      location.href = "rules.html";
    }

  });
});
