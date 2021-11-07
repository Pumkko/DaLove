const AppContainerTypes = {
    IAuthService: Symbol.for('IAuthService'),
    IRandomMemoryAccessService: Symbol.for('IRandomMemoryAccessService'),
    IUserProfileService: Symbol.for('IUserProfileService'),

    LoginStoreService: Symbol.for('LoginStoreService'),
    MemoryStoreService: Symbol.for('MemoryStoreService'),
    UploadMemoryStoreService: Symbol.for('UploadMemoryStoreService')
};

export { AppContainerTypes };
