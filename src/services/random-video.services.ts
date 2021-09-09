
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { parseUrl } from '@aws-sdk/url-parser';

import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

/**
 * Renvoi le nom d'une vidéo choisi au hasard parmi le repertoire assets/video
 */
export class RandomVideoService {
    // J'aimerais bien trouver une meilleure solution mais vraiment j'ai pas
    // utiliser l'uri dans la vidéo ne marche pas, mais peut-être que plus tard ces vidéos seront stockées sur internet
    readonly videos = []

    private client: S3Client;
    constructor() {
        const region = "eu-west-3";

        this.client = new S3Client({
            region,
            urlParser: parseUrl,
            credentials: {
                accessKeyId: "",
                secretAccessKey: ''
            }
        });
    }

    getRandomVideo(): any {
        this.client.send(new GetObjectCommand({
            Bucket: 'dalove',
            Key: 'daniel_has_to_run.mp4'
        })).then(response => {
            return response.ContentLength;
        }).catch(error => {
            console.log(error);
        });

        return null;
    }
}