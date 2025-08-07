import { describe, expect, it } from "vitest";
import { daysInMonth } from "./util";

describe("daysInMonth", () => {
  it("should return the correct number of days in a month", () => {
    expect(daysInMonth(1, 2023)).toBe(31); // January
    expect(daysInMonth(2, 2023)).toBe(28); // February (non-leap year)
    expect(daysInMonth(2, 2024)).toBe(29); // February (leap year)
    expect(daysInMonth(3, 2023)).toBe(31); // March
    expect(daysInMonth(4, 2023)).toBe(30); // April
    expect(daysInMonth(5, 2023)).toBe(31); // May
    expect(daysInMonth(6, 2023)).toBe(30); // June
    expect(daysInMonth(7, 2023)).toBe(31); // July
    expect(daysInMonth(8, 2023)).toBe(31); // August
    expect(daysInMonth(9, 2023)).toBe(30); // September
    expect(daysInMonth(10, 2023)).toBe(31); // October
    expect(daysInMonth(11, 2023)).toBe(30); // November
    expect(daysInMonth(12, 2023)).toBe(31); // December
  });
});
