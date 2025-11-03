/* Reverse String — minimal implementation with strong practices.
 * - Button only appears when input length > 3 (Unicode-aware)
 * - Pure function, no globals, accessible result
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

  // Show/enable button only when there is enough text (> 3 characters).
  function updateButtonState() {
    const count = [...input.value.trim()].length; // Unicode-aware length
    const hasEnough = count > 3;
    button.hidden = !hasEnough;
    button.disabled = !hasEnough;
  }
  updateButtonState();

  input.addEventListener("input", () => {
    error.style.display = "none";
    updateButtonState();
  });

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const text = input.value.trim();
    if ([...text].length <= 3) {
      error.textContent = "Please enter at least 4 characters.";
      error.style.display = "block";
      result.value = "";
      input.focus();
      return;
    }

    result.value = reverseString(text);
    input.select();
  });
})();
