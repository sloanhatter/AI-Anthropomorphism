// assets/js/demographics.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('demographic-info');
  if (!form) return;

  const ENDPOINT = "https://script.google.com/macros/s/AKfycbwxd90PNlso-4UyWg3rAnn0uDiL9M260Y94nNTRiPDlHYsUq5L3mKdeI1P9DLYmszN85w/exec";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const ageInput = document.getElementById('age');
    const schoolingSelect = document.getElementById('schooling-level');
    const aiUseSelect = document.getElementById('ai-use');

    const payload = {
      age: ageInput ? ageInput.value : "",
      gender: (document.querySelector('input[name="gender"]:checked') || {}).value || "",
      schooling_level: schoolingSelect ? schoolingSelect.value : "",
      ai_use: aiUseSelect ? aiUseSelect.value : "",
      user_agent: navigator.userAgent,
      referrer: document.referrer
    };

    try {
      await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          // text/plain keeps this a "simple request" (no preflight)
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      // On success, go to Rules page
      window.location.href = "rules.html";
    } catch (err) {
      console.error("Error submitting demographics:", err);
      alert("There was an error submitting the form. Please try again.");
    }
  });
});
