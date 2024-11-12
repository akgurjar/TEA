import { pbkdf2, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

const SALT_LENGTH = 16; // Salt length in bytes
const HASH_LENGTH = 64; // Length of the derived hash
const ITERATIONS = 10000; // Number of hashing iterations
const DIGEST = 'sha512'; // Hashing algorithm (secure and widely supported)

/**
 * Hashes a password using PBKDF2 with a unique salt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - The salt and hashed password, encoded as a single string.
 */
export async function hash(password: string): Promise<string> {
	const salt = randomBytes(SALT_LENGTH).toString('hex');
	const derivedKey = await promisify(pbkdf2)(
		password,
		salt,
		ITERATIONS,
		HASH_LENGTH,
		DIGEST,
	);
	return derivedKey.toString('hex');
}

/**
 * Verifies if a password matches a stored hash.
 * @param {string} password - The password to verify.
 * @param {string} storedHash - The stored salt:hash string.
 * @returns {Promise<boolean>} - Whether the password matches the stored hash.
 */
export async function compare(
	password: string,
	storedHash: string,
): Promise<boolean> {
	const [salt, originalHash] = storedHash.split(':'); // Extract salt and hash from stored string
	const derivedKey = await promisify(pbkdf2)(
		password,
		salt,
		ITERATIONS,
		HASH_LENGTH,
		DIGEST,
	);
	return derivedKey.toString('hex') === originalHash;
}

export const passwordUtil = {
	async verify(this: any, password: string): Promise<boolean> {
		return await compare(password, this.password);
	},
	async hook(this: any) {
		const password = this.password;
		if (this.isModified('password')) {
			// console.log('password modified');
			this.password = await hash(password);
		}
	},
};
