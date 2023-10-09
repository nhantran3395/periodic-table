export default {
	check,
	lookup,
};

var elementLookUpTable = {};

await loadPeriodicTable();


// ****************************

async function loadPeriodicTable() {
	const elements = await (await fetch("periodic-table.json")).json();
	elements.forEach(element => elementLookUpTable[`${element.symbol}`] = element);
}

function check(inputWord) {
	if (inputWord.length <= 0) {
		return [];
	}

	const elements = Object.values(elementLookUpTable);

	for (let element of elements) {
		const symbol = element.symbol;
		const symbolMatchesStartingCharactersInInputWord = inputWord.slice(0,symbol.length).toLowerCase() === symbol.toLowerCase();

		if(symbolMatchesStartingCharactersInInputWord && inputWord.length > symbol.length) {
			const result = check(inputWord.slice(symbol.length));

			if (result && result.length > 0){
				return [symbol, ...result];
			}
		}

		if(symbolMatchesStartingCharactersInInputWord && inputWord.toLowerCase(0,symbol.length) === symbol.toLowerCase()) {
			return [symbol];
		}
	}
}

function lookup(elementSymbol) {
	return elementLookUpTable[elementSymbol];
}
