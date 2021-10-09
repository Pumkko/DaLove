export interface IAuthService {
    login(): Promise<string>;
    logout(): Promise<void>;
}

