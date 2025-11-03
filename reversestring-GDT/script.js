/* Reverse String — minimal implementation with strong practices.
 * - Pure function `reverseString` (no side effects)
 * - Defensive checks + tiny UX hints
 * - Accessibility: aria-live result, form semantics
 */
(() => {
  "use strict";

  /**
   * Returns a new string with characters in reverse order.
   * Uses the spread operator to better handle Unicode code points than `split('')`.
   * Note: complex grapheme clusters (e.g., emojis with ZWJ) are not fully normalized
   * in this minimal solution.
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

  // Enhance: disable button when empty (progressive; works even without this).
  function updateButtonState() {
    button.disabled = !input.value.trim();
  }
  updateButtonState();

  input.addEventListener("input", () => {
    error.style.display = "none";
    updateButtonState();
  });

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const text = input.value;
    if (!text || !text.trim()) {
      error.textContent = "Please enter some text to reverse.";
      error.style.display = "block";
      result.value = "";
      input.focus();
      return;
    }

    // Core logic
    const reversed = reverseString(text);
    result.value = reversed;

    // Optional: keep focus on input for fast iteration
    input.select();
  });

  // Minimal smoke test in dev tools
  // console.assert(reverseString("AI4Devs") === "sveD4IA", "Smoke test failed");
})();
