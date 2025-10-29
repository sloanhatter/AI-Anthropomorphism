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
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain" }, // avoids CORS preflight on GH Pages
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error(r.status);
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || "Save failed");
      location.href = "rules.html"; // redirect on success
    } catch (err) {
      console.error(err);
      alert("Could not save your response. Please try again.");
    }
  });
});
