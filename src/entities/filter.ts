export enum Filter {
	Best = 'best',
	Hot = 'hot',
	New = 'new',
	Rising = 'rising',
	Controversial = 'controversial'
}

export function isFilter(filter: string): filter is Filter {
	return Object.values(Filter).includes(filter as Filter);
}
