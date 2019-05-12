
declare namespace Api {
	export interface ListingResult {
		pageIndex: number;
		pageSize: number;
		total: number;
		data: any[];
	}
	export interface OtpSenderData {}
	export interface UserSignInData {
		countryCode: string;
		mobile: string;
	}
	export interface UserVerificationData {
		id: string;
		otp: string;
	}
	export interface SignInResult {
		authToken: string;
		refreshToken: string;
	}
}
