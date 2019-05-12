/// <reference types="node" />

declare namespace NodeJS {
	/**
	 * It is used to store couting number of documents so that a unique id can added to the documents.
	 */
	export interface Counters {
		user: number;
	}
	export interface Verification {
		otp: string;
		mobile: string;
		countryCode: string;
	}
	export interface Global {
		counters: Counters;
		verifications: {[id: string]: Verification}
	}
}
