/* Reverse String — minimal implementation with strong practices.
 * - Real-time reversed output (no button)
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
  const input = /** @type {HTMLInputElement} */ (document.getElementById("text"));
  const result = /** @type {HTMLOutputElement} */ (document.getElementById("result"));

  // Update the output in real time.
  function updateOutput() {
    result.value = reverseString(input.value ?? "");
  }

  // Initial paint + live updates.
  updateOutput();
  input.addEventListener("input", updateOutput);

  // Minimal smoke test in dev tools:
  // console.assert(reverseString("AI4Devs") === "sveD4IA", "Smoke test failed");
})();
