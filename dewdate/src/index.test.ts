import { describe, it, expect } from "vitest";
import { Dewdate } from ".";

describe("Dewdate", () => {
  describe("constructor", () => {
    it("should correctly set and get day, month, and year", () => {
      const dewdate = new Dewdate(15, 8, 2023);
      expect(dewdate.Day).toBe(15);
      expect(dewdate.Month).toBe(8);
      expect(dewdate.Year).toBe(2023);
    });

    it("should handle invalid day", () => {
      expect(() => new Dewdate(32, 1, 2023)).toThrowError(); // January has 31 days
    });

    it("should handle invalid month", () => {
      expect(() => new Dewdate(15, 13, 2023)).toThrowError(); // Invalid month
    });

    it("should handle invalid year", () => {
      expect(() => new Dewdate(15, 8, -2023)).toThrowError(); // Year cannot be negative
    });
  });

  describe("set day", () => {
    it("should set day correctly within valid range", () => {
      const dewdate = new Dewdate(15, 8, 2023);
      dewdate.Day = 10;
      expect(dewdate.Day).toBe(10);
    });

    it("should not set day below 1", () => {
      const dewdate = new Dewdate(15, 8, 2023);
      dewdate.Day = 0;
      expect(dewdate.Day).toBe(1);
    });

    it("should not set day above maximum for month", () => {
      const dewdate = new Dewdate(15, 2, 2023); // February has 28 days in non-leap years
      dewdate.Day = 30;
      expect(dewdate.Day).toBe(28);
    });
  });

  describe("set month", () => {
    it("should set month correctly within valid range", () => {
      const dewdate = new Dewdate(15, 8, 2023);
      dewdate.Month = 5;
      expect(dewdate.Month).toBe(5);
    });

    it("should not set month below 1", () => {
      const dewdate = new Dewdate(15, 8, 2023);
      dewdate.Month = 0;
      expect(dewdate.Month).toBe(1); // Should default to January
    });

    it("should not set month above 12", () => {
      const dewdate = new Dewdate(15, 8, 2023);
      dewdate.Month = 13;
      expect(dewdate.Month).toBe(12); // Should default to December
    });
  });

  describe("set year", () => {
    it("should set year correctly", () => {
      const dewdate = new Dewdate(15, 8, 2023);
      dewdate.Year = 2025;
      expect(dewdate.Year).toBe(2025);
    });

    it("should not set year below 0", () => {
      const dewdate = new Dewdate(15, 8, 2023);
      dewdate.Year = -2023;
      expect(dewdate.Year).toBe(0); // Should default to year 0
    });
  });

  describe("increment day", () => {
    it("should increment day correctly", () => {
      const dewdate = new Dewdate(31, 12, 2023);
      dewdate.incrementDay();
      expect(dewdate.Day).toBe(1); // January 1st
      expect(dewdate.Month).toBe(1); // January
      expect(dewdate.Year).toBe(2024); // New Year
    });

    it("should handle month overflow correctly", () => {
      const dewdate = new Dewdate(30, 4, 2023); // April has 30 days
      dewdate.incrementDay();
      expect(dewdate.Day).toBe(1); // May 1st
      expect(dewdate.Month).toBe(5); // May
      expect(dewdate.Year).toBe(2023);
    });

    it("should handle leap years correctly", () => {
      const leapYearDewdate = new Dewdate(29, 2, 2024); // Leap year
      expect(leapYearDewdate.Day).toBe(29);
      expect(leapYearDewdate.Month).toBe(2);
      expect(leapYearDewdate.Year).toBe(2024);

      leapYearDewdate.incrementDay();
      expect(leapYearDewdate.Day).toBe(1); // March 1st
      expect(leapYearDewdate.Month).toBe(3);
      expect(leapYearDewdate.Year).toBe(2024);
    });
  });

  describe("decrement day", () => {
    it("should decrement day correctly", () => {
      const dewdate = new Dewdate(1, 1, 2024);
      dewdate.decrementDay();
      expect(dewdate.Day).toBe(31); // December 31st
      expect(dewdate.Month).toBe(12); // December
      expect(dewdate.Year).toBe(2023); // Previous year
    });

    it("should handle month underflow correctly", () => {
      const dewdate = new Dewdate(1, 3, 2023); // March 1st
      dewdate.decrementDay();
      expect(dewdate.Day).toBe(28); // February 28th (non-leap year)
      expect(dewdate.Month).toBe(2); // February
      expect(dewdate.Year).toBe(2023);
    });

    it("should handle leap years correctly", () => {
      const leapYearDewdate = new Dewdate(1, 3, 2024); // March 1st
      leapYearDewdate.decrementDay();
      expect(leapYearDewdate.Day).toBe(29); // February 29th (leap year)
      expect(leapYearDewdate.Month).toBe(2);
      expect(leapYearDewdate.Year).toBe(2024);
    });
  });

  describe("increment month", () => {
    it("should increment month correctly", () => {
      const dewdate = new Dewdate(15, 11, 2023);
      dewdate.incrementMonth();
      expect(dewdate.Day).toBe(15); // Day remains the same
      expect(dewdate.Month).toBe(12); // December
      expect(dewdate.Year).toBe(2023);
    });

    it("should handle month overflow", () => {
      const dewdate = new Dewdate(15, 12, 2023);
      dewdate.incrementMonth();
      expect(dewdate.Day).toBe(15); // Day remains the same
      expect(dewdate.Month).toBe(1); // January
      expect(dewdate.Year).toBe(2024); // New Year
    });

    it("should handle day overflow on non-leap year", () => {
      const dewdate = new Dewdate(31, 1, 2023); // January 31st
      dewdate.incrementMonth(); // Should go to February 29th
      expect(dewdate.Day).toBe(28); // February 28th (non-leap year)
      expect(dewdate.Month).toBe(2);
      expect(dewdate.Year).toBe(2023);
    });

    it("should handle day overflow on leap year", () => {
      const dewdate = new Dewdate(31, 1, 2024); // January 31st
      dewdate.incrementMonth(); // Should go to February 29th
      expect(dewdate.Day).toBe(29); // February 29th (leap year)
      expect(dewdate.Month).toBe(2);
      expect(dewdate.Year).toBe(2024);
    });
  });

  describe("decrement month", () => {
    it("should decrement month correctly", () => {
      const dewdate = new Dewdate(15, 1, 2024);
      dewdate.decrementMonth();
      expect(dewdate.Day).toBe(15); // Day remains the same
      expect(dewdate.Month).toBe(12); // December
      expect(dewdate.Year).toBe(2023);
    });

    it("should handle month underflow", () => {
      const dewdate = new Dewdate(15, 1, 2024);
      dewdate.decrementMonth();
      expect(dewdate.Day).toBe(15); // Day remains the same
      expect(dewdate.Month).toBe(12); // December
      expect(dewdate.Year).toBe(2023);
    });

    it("should handle day overflow on non-leap year", () => {
      const dewdate = new Dewdate(31, 3, 2023); // March 31st
      dewdate.decrementMonth(); // Should go to February 28th
      expect(dewdate.Day).toBe(28); // February 28th (non-leap year)
      expect(dewdate.Month).toBe(2);
      expect(dewdate.Year).toBe(2023);
    });

    it("should handle day overflow on leap year", () => {
      const dewdate = new Dewdate(31, 3, 2024); // March 31st
      dewdate.decrementMonth(); // Should go to February 29th
      expect(dewdate.Day).toBe(29); // February 29th (leap year)
      expect(dewdate.Month).toBe(2);
      expect(dewdate.Year).toBe(2024);
    });
  });

  describe("increment year", () => {
    it("should increment year correctly", () => {
      const dewdate = new Dewdate(15, 8, 2023);
      dewdate.incrementYear();
      expect(dewdate.Day).toBe(15); // Day remains the same
      expect(dewdate.Month).toBe(8); // Month remains the same
      expect(dewdate.Year).toBe(2024); // Year incremented
    });

    it("should decrement year correctly", () => {
      const dewdate = new Dewdate(15, 8, 2023);
      dewdate.decrementYear();
      expect(dewdate.Day).toBe(15); // Day remains the same
      expect(dewdate.Month).toBe(8); // Month remains the same
      expect(dewdate.Year).toBe(2022); // Year decremented
    });
  });
});
