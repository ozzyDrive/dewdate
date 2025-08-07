import { daysInMonth } from "./util";

export class Dewdate {
  private day: number;
  private month: number;
  private year: number;

  constructor(day: number, month: number, year: number) {
    if (day < 1 || day > daysInMonth(month, year)) {
      throw new Error(`Day must be between 1 and ${daysInMonth(month, year)}`);
    }

    if (month < 1 || month > 12) {
      throw new Error("Month must be between 1 and 12");
    }

    if (year < 0) {
      throw new Error("Year cannot be negative");
    }

    this.day = day;
    this.month = month;
    this.year = year;
  }

  set Day(day: number) {
    if (day < 1) {
      this.day = 1;
    } else if (day > daysInMonth(this.month, this.year)) {
      this.day = daysInMonth(this.month, this.year);
    } else {
      this.day = day;
    }
  }

  set Month(month: number) {
    if (month < 1) {
      this.month = 1;
    } else if (month > 12) {
      this.month = 12;
    } else {
      this.month = month;
    }
  }

  set Year(year: number) {
    if (year < 0) {
      this.year = 0;
    } else {
      this.year = year;
    }
  }

  get Day(): number {
    return this.day;
  }

  get Month(): number {
    return this.month;
  }

  get Year(): number {
    return this.year;
  }

  /**
   * Increments the day by one, adjusting the month and year if necessary.
   * If the day exceeds the number of days in the current month, it resets to 1 and increments the month.
   * If the month exceeds December, it resets to January and increments the year.
   */
  public incrementDay(): void {
    this.day += 1;

    const daysInCurrentMonth = daysInMonth(this.month, this.year);
    if (this.day > daysInCurrentMonth) {
      this.day = 1;
      if (this.month === 12) {
        this.month = 1;
        this.year += 1;
      } else this.month += 1;
    }
  }

  /**
   * Decrements the day by one, adjusting the month and year if necessary.
   * If the day goes below 1, it resets to the last day of the previous month and decrements the month.
   * If the month goes below January, it resets to December and decrements the year.
   */
  public decrementDay(): void {
    this.day -= 1;
    if (this.day < 1) {
      if (this.month <= 1) {
        this.day = daysInMonth(12, this.year - 1);
        this.month = 12;
        this.year -= 1;
      } else {
        this.day = daysInMonth(this.month - 1, this.year);
        this.month -= 1;
      }
    }
  }

  public incrementMonth(): void {
    this.month += 1;
    if (this.month > 12) {
      this.month = 1;
      this.year += 1;
    }
    if (this.day > daysInMonth(this.month, this.year)) {
      this.day = daysInMonth(this.month, this.year);
    }
  }

  public decrementMonth(): void {
    this.month -= 1;
    if (this.month < 1) {
      this.month = 12;
      this.year -= 1;
      if (this.year < 0) {
        this.year = 0;
      }
    }
    if (this.day > daysInMonth(this.month, this.year)) {
      this.day = daysInMonth(this.month, this.year);
    }
  }

  public incrementYear(): void {
    this.year += 1;
  }

  public decrementYear(): void {
    if (this.year > 0) {
      this.year -= 1;
    }
  }
}
