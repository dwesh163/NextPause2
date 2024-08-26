export type School = {
	name: string;
	time: string[];
	text?: string[];
};

export type TimeObject = {
	[key: string]: {
		name: string;
		time: string[];
	};
};
