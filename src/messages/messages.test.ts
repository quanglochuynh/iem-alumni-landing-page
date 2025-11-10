import { en } from "./en";
import { vi } from "./vi";

const locales = [en, vi];

interface Message {
  [key: string]: any;
}

function countNestedKeys(obj: Message): number {
  return Object.values(obj).reduce<number>((count, value) => {
    if (typeof value === "object" && value !== null) {
      return count + countNestedKeys(value);
    }
    return count + 1;
  }, 0);
}

describe("Language files", () => {
  test("vi and en have the same total number of keys", () => {
    const transCount = locales.map((locale) => countNestedKeys(locale));
    const allEqual = transCount.every((val, _, arr) => val === arr[0]);
    expect(allEqual).toBeTruthy();
  });
});
