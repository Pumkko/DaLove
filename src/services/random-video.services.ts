
/**
 * Renvoi le nom d'une vidéo choisi au hasard parmi le repertoire assets/video
 */
export class RandomVideoService {

    // J'aimerais bien trouver une meilleure solution mais vraiment j'ai pas
    // utiliser l'uri dans la vidéo ne marche pas, mais peut-être que plus tard ces vidéos seront stockées sur internet
    readonly videos = [
        require('../assets/videos/DanielGotRaped.mp4'),
        require('../assets/videos/DanielIsHappyToSeeUs.mp4'),
        require('../assets/videos/DanielLovesKevin.mp4'),
        require('../assets/videos/DanielNeedsToTakeAShit.mp4'),
        require('../assets/videos/DanielSliding.mp4'),
        require('../assets/videos/DanielWillDie.mp4'),
        require('../assets/videos/IWantYouInMyRoom.mp4'),
        require('../assets/videos/KevinFitsInALocker.mp4'),
        require('../assets/videos/Randelo.mp4'),
        require('../assets/videos/Revenge.mp4'),
        require('../assets/videos/SexierLeon.mp4'),
        require('../assets/videos/Tattoos.mp4'),
        require('../assets/videos/TryScorpions.mp4'),
        require('../assets/videos/WomenToilets.mp4'),
        require('../assets/videos/julianShakira.mp4'),
        require('../assets/videos/julianTitanic.mp4'),
        require('../assets/videos/julianCatcher.mp4'),
        require('../assets/videos/sexyJulian.mp4')
    ]

    getRandomVideo(): any {
        const randomId = Math.floor(Math.random() * (this.videos.length - 1));
        return this.videos[randomId];
    }
}