import { getRandomColor } from "./common";

describe.only("getRandomColor", () => {
  it("should return a valid hex color code", () => {
    const color = getRandomColor();
    // Check if the color starts with a "#" and is followed by 6 hex digits
    expect(color).toMatch(/^#[0-9A-F]{6}$/);
  });

  it("should return a different color on multiple calls", () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    expect(color1).not.toBe(color2);
  });
});
