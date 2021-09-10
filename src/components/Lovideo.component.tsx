import React, { useEffect, useState } from 'react';

import Video from 'react-native-video';
import { RandomVideoService } from '../services/random-video.services';
import { Dimensions, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigation-types';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Video'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};


export const Lovideo: React.FC<Props> = ({navigation}: Props) => { 
    const width = Dimensions.get('screen').width;
    const height = Dimensions.get('screen').height;

    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const service = new RandomVideoService();
        service
            .getRandomVideo()
            .then((url) => {
                setVideoUrl(url);
            })
            .catch((error) => {
                // Deal with the error
                console.log(error);
            });
    });

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Video
                source={{ uri: videoUrl }}
                resizeMode={'contain'}
                style={{
                    aspectRatio: width / height,
                    width: '100%',
                }}
                controls={true}
                autoplay={true}
                onEnd={() => {
                    navigation.navigate('MainView');
                }}
            />
        </View>
    );
};

export default Lovideo;
