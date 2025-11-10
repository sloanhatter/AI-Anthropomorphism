// assets/js/demographics.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('demographic-info');
  if (!form) return;

  const ENDPOINT = "https://script.google.com/macros/s/AKfycbwxd90PNlso-4UyWg3rAnn0uDiL9M260Y94nNTRiPDlHYsUq5L3mKdeI1P9DLYmszN85w/exec";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Create or reuse participant_id
    let participantId = localStorage.getItem('participant_id');
    if (!participantId) {
      if (window.crypto && crypto.randomUUID) {
        participantId = crypto.randomUUID();
      } else {
        participantId = Date.now().toString(36) + Math.random().toString(36).slice(2);
      }
      localStorage.setItem('participant_id', participantId);
    }

    const payload = {
      // demographic fields:
      age: document.getElementById('age').value || "",
      gender: (document.querySelector('input[name="gender"]:checked') || {}).value || "",
      education: document.getElementById('education').value || "",
      // add any other fields you already send...

      participant_id: participantId
    };

    try {
      await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain" // matches your existing setup to avoid preflight
        },
        body: JSON.stringify(payload)
      });

      // After successful save, go to rules page
      window.location.href = "rules.html";
    } catch (err) {
      console.error("Error submitting demographics:", err);
      alert("There was an error submitting the form. Please try again.");
    }
  });
});


  });
});
