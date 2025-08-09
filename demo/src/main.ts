import { Dewdate } from "dewdate";

const preventNonNumericInput = (e: InputEvent) => {
  if (e.inputType === "insertText" && !/^\d$/.test(e.data || "")) {
    e.preventDefault();
  }
};

const pad = (value: number, length: number) => {
  return value.toString().padStart(length, "0");
};

const attachInputListener = (
  input: HTMLInputElement,
  property: "Day" | "Month" | "Year"
) => {
  input.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    if (isNaN(value)) return;
    if (target.value === "0") return; // intermediate state
    dewdate[property] = value;
    if (target.value === dewdate[property].toString()) return; // stop input from jumping to end when first character is erased
    target.value = pad(dewdate[property], property === "Year" ? 4 : 2);
  });

  input.addEventListener("blur", (e) => {
    const target = e.target as HTMLInputElement;
    target.value = pad(dewdate[property], property === "Year" ? 4 : 2);
  });
};

const dayInput = document.getElementById("day") as HTMLInputElement;
const monthInput = document.getElementById("month") as HTMLInputElement;
const yearInput = document.getElementById("year") as HTMLInputElement;

dayInput?.addEventListener("beforeinput", preventNonNumericInput);
monthInput?.addEventListener("beforeinput", preventNonNumericInput);
yearInput?.addEventListener("beforeinput", preventNonNumericInput);

const now = new Date();

const dewdate = new Dewdate(
  now.getDay(),
  now.getMonth() + 1,
  now.getFullYear()
);

dayInput.value = pad(dewdate.Day, 2);
monthInput.value = pad(dewdate.Month, 2);
yearInput.value = pad(dewdate.Year, 4);

attachInputListener(dayInput, "Day");
attachInputListener(monthInput, "Month");
attachInputListener(yearInput, "Year");
