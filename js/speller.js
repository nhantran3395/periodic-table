export default {
  check,
  lookup,
  findCandidates,
};

var elementLookUpTable = {};

(async () => await loadPeriodicTable())();

// ****************************

async function loadPeriodicTable() {
  let elements = [];

  if (typeof window === "undefined") {
    const fs = await import("node:fs");
    elements = JSON.parse(fs.readFileSync("periodic-table.json"));
  } else {
    elements = await (await fetch("periodic-table.json")).json();
  }

  elements.forEach(
    (element) =>
      (elementLookUpTable[`${element.symbol.toLowerCase()}`] = element),
  );
}

function findCandidates(inputWord) {
  if (inputWord.length === 0) {
    return [];
  }

  const twoLettersSymbols = [];
  const oneLetterSymbols = [];

  const letters = inputWord.split("");

  // find 2 letters symbols and 1 letter symbols
  letters.forEach((letter, index) => {
    const oneLetterCandidate = letter.toLowerCase();

    if (elementLookUpTable.hasOwnProperty(oneLetterCandidate)) {
      oneLetterSymbols.push(oneLetterCandidate);
    }

    if (index > letters.length - 2) {
      return;
    }

    const nextLetter = letters[index + 1];
    const twoLettersCandidate = `${letter}${nextLetter}`.toLowerCase();

    if (elementLookUpTable.hasOwnProperty(twoLettersCandidate)) {
      twoLettersSymbols.push(twoLettersCandidate);
    }
  });

  return [...twoLettersSymbols, ...oneLetterSymbols];
}

function spellWord(inputWord, candidates) {
  if (inputWord.length === 0) {
    return [];
  }

  for (const candidate of candidates) {
    const chunk = inputWord.slice(0, candidate.length).toLowerCase();
    const remain = inputWord.slice(candidate.length);

    const matched = chunk === candidate;

    if (matched && inputWord.length > candidate.length) {
      const result = check(remain);

      if (result && result.length > 0) {
        return [candidate, ...result];
      }
    }

    if (matched && inputWord.length === candidate.length) {
      return [candidate];
    }
  }

  return [];
}

function check(inputWord) {
  const candidates = findCandidates(inputWord);
  return spellWord(inputWord, candidates);
}

function lookup(symbol) {
  return elementLookUpTable[symbol];
}
