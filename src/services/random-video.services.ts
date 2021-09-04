
/**
 * Renvoi le nom d'une vidéo choisi au hasard parmi le repertoire assets/video
 */
export class RandomVideoService {

    readonly videos = [
        'DanielGotRaped.mp4',
        'DanielIsHappyToSeeUs.mp4',
        'DanielLovesKevin.mp4',
        'DanielNeedsToTakeAShit.mp4',
        'DanielSliding.mp4',
        'DanielWillDie.mp4',
        'IWantYouInMyRoom.mp4',
        'KevinFitsInALocker.mp4',
        'Randelo.mp4',
        'Revenge.mp4',
        'SexierLeon.mp4',
        'Tattoos.mp4',
        'TryScorpions.mp4',
        'WomenToilets.mp4',
        'julian.mp4'
    ]


    getRandomVideo(): string {
        const randomId = Math.floor(Math.random() * (this.videos.length - 1));
        return this.videos[randomId];
    }
}