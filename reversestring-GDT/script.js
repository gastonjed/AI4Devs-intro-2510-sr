/* Reverse String — minimal implementation with strong practices.
 * - Real-time reversed output, only shown when input length > 3
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

  /**
   * Counts characters in a Unicode-aware way (code points).
   * @param {string} s
   * @returns {number}
   */
  function lengthUnicode(s) {
    return [...(s ?? "")].length;
  }

  // Cache DOM references once.
  const input = /** @type {HTMLInputElement} */ (document.getElementById("text"));
  const result = /** @type {HTMLOutputElement} */ (document.getElementById("result"));

  // Update the output in real time, but only if length > 3.
  function updateOutput() {
    const value = input.value ?? "";
    if (lengthUnicode(value) > 3) {
      result.value = reverseString(value);
    } else {
      result.value = ""; // hide by clearing when not enough characters
    }
  }

  // Initial paint + live updates.
  updateOutput();
  input.addEventListener("input", updateOutput);

  // Minimal smoke test in dev tools:
  // console.assert(reverseString("AI4Devs") === "sveD4IA", "Smoke test failed");
})();
