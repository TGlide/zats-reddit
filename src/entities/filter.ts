export enum Filter {
	Hot = 'hot',
	New = 'new',
	Controversial = 'controversial'
}

export function isFilter(filter: string): filter is Filter {
	return Object.values(Filter).includes(filter as Filter);
}
