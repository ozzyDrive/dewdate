import { Dewdate } from "dewdate";

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const preventNonNumericInput = (e: InputEvent) => {
  if (e.inputType === "insertText" && !/^\d$/.test(e.data || "")) {
    e.preventDefault();
  }
};

dayInput?.addEventListener("beforeinput", preventNonNumericInput);
monthInput?.addEventListener("beforeinput", preventNonNumericInput);
yearInput?.addEventListener("beforeinput", preventNonNumericInput);

console.log(Dewdate);
