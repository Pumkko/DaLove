describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("doit avoir la vue principale avec les éléments graphiques pour l'énigme", async () => {
    await expect(element(by.id('riddleText'))).toBeVisible();
    await expect(element(by.id('inputRiddleAnswer'))).toBeVisible();
    await expect(element(by.id('submitRiddleAnswer'))).toBeVisible();
  });

  it("Doit pouvoir fournir une réponse correcte a l'énigme", async () => {
    await element(by.id('inputRiddleAnswer')).typeText('test answer');
    await element(by.id('submitRiddleAnswer')).tap();

    await waitFor(element(by.id('correctAnswerText'))).toBeVisible().withTimeout(100);
  });
});
