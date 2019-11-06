function sortObjectByKeys(obj) {
    return Object.entries(obj)
        .sort()
        .reduce(
            (accumulator, currentEntry) => ({
                ...accumulator,
                [currentEntry[0]]: currentEntry[1],
            }),
            {} // initial value
        );
}