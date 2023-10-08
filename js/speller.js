export default {
	check,
	lookup,
};

var elements;

await loadPeriodicTable();


// ****************************

async function loadPeriodicTable() {
	elements = await (await fetch("periodic-table.json")).json();
}

function check(inputWord) {
	if (inputWord.length <= 0) {
		return [];
	}

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
	const index = elements.findIndex(element => element.symbol.toLowerCase() === elementSymbol.toLowerCase());
	if (index <= -1) {
		throw new Error('cannot find element');
	}

	return elements[index];
}
