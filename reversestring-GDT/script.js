/* Reverse String — minimal implementation with strong practices.
 * - Real-time reversed output (does not depend on the button)
 * - Button only appears when input length > 3
 * - Pure function for logic, accessible output area
 */
(() => {
  "use strict";

  /**
   * Returns a new string with characters in reverse order.
   * Uses the spread operator to better handle Unicode code points than `split('')`.
   * Note: complex grapheme clusters (e.g., emojis with ZWJ) are not fully normalized.
   * @param {string} input
   * @returns {string}
   */
  function reverseString(input) {
    if (typeof input !== "string") return "";
    return [...input].reverse().join("");
  }

  // Cache DOM references once.
  const form = document.getElementById("reverse-form");
  const input = /** @type {HTMLInputElement} */ (document.getElementById("text"));
  const result = /** @type {HTMLOutputElement} */ (document.getElementById("result"));
  const error = /** @type {HTMLParagraphElement} */ (document.getElementById("error"));
  const button = /** @type {HTMLButtonElement} */ (document.getElementById("submit"));

  // Show/hide the button based on Unicode-aware character count (> 3).
  function updateButtonVisibility() {
    const count = [...(input.value ?? "")].length;
    const hasEnough = count > 3;
    button.hidden = !hasEnough;
    button.disabled = !hasEnough;
  }

  // Update the output in real time.
  function updateOutput() {
    result.value = reverseString(input.value ?? "");
  }

  // Initial paint.
  updateButtonVisibility();
  updateOutput();

  input.addEventListener("input", () => {
    error.style.display = "none";
    updateButtonVisibility();
    updateOutput();
  });

  // Keep the button functional, but not required.
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    // On submit, we just ensure output is up to date and keep focus for fast iteration.
    updateOutput();
    input.select();
  });

  // Minimal smoke test in dev tools:
  // console.assert(reverseString("AI4Devs") === "sveD4IA", "Smoke test failed");
})();
