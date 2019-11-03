/// <reference types="node" />

declare module NodeJS {
	/**
	 * It is used to store couting number of documents so that a unique id can added to the documents.
	 */
	export interface Counters {
		user: number;
	}
	export interface Global {
		counters: Counters;
	}
}
