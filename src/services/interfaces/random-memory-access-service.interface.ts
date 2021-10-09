export interface UriVideoSource {
    uri: string;
}

export interface IRandomMemoryAccessService {
    getRandomMemory(): Promise<UriVideoSource>
    
}

