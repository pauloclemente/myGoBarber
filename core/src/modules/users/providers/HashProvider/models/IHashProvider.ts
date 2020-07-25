export default interface IHashProvider {
	generationsHash(payload: string): Promise<string>;
	compareHash(payload: string, hashed: string): Promise<boolean>;
}
