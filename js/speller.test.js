import Speller from "./speller";
import { expect } from "@jest/globals";

describe("speller", () => {
  describe("findCandidate", () => {
    it("return array of candidates that can be used to break input word", () => {
      expect(Speller.findCandidates("because")).toStrictEqual([
        "be",
        "ca",
        "au",
        "se",
        "b",
        "c",
        "u",
        "s",
      ]);

      expect(Speller.findCandidates("yuck")).toStrictEqual([
        "y",
        "u",
        "c",
        "k",
      ]);
    });
  });

  describe("check", () => {
    it("return array of symbols from periodic table if word can be break", () => {
      expect(Speller.check("because")).toStrictEqual(["be", "ca", "u", "se"]);

      expect(Speller.check("pancreas")).toStrictEqual([
        "pa",
        "n",
        "c",
        "re",
        "as",
      ]);

      expect(Speller.check("yuck")).toStrictEqual(["y", "u", "c", "k"]);
    });

    it("return empty array if word cannot be break", () => {
      expect(Speller.check("hello")).toStrictEqual([]);
    });
  });
});
