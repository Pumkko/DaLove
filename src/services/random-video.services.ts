
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { parseUrl } from '@aws-sdk/url-parser';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
        'JulienWeirdSexuality.mp4',
        'KevinFitsInALocker.mp4',
        'Randelo.mp4',
        'Revenge.mp4',
        'SexierLeon.mp4',
        'Tattoos.mp4',
        'TryScorpions.mp4',
        'WomenToilets.mp4',
        'julianCatcher.mp4',
        'julianShakira.mp4',
        'julianTitanic.mp4',
        'sexyJulian.mp4',
    ]

    private client: S3Client;
    constructor() {
        const region = 'eu-west-3';

        this.client = new S3Client({
            region,
            urlParser: parseUrl,
            credentials: {
                accessKeyId: '',
                secretAccessKey: ''
            }
        });
    }

    getRandomVideo(): Promise<string> {
        const randomId = Math.floor(Math.random() * this.videos.length - 1);
        const randomVideoName = this.videos[randomId];

        const getCommand = new GetObjectCommand({
            Bucket: 'dalove',
            Key: randomVideoName
        });

        return getSignedUrl(this.client, getCommand, { expiresIn: 3600 });
    }
}