import React, { useEffect, useState } from 'react';

import Video from 'react-native-video';
import { IRandomVideoService, VideoSource } from '../services/random-video.services';
import { Dimensions, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigation-types';
import { AppContainerTypes } from '../inversify/app-container-types';
import { useInjection } from 'inversify-react';
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

    const [videoSource, setVideoSource] = useState<VideoSource | null>(null);

    const randomVideoService = useInjection<IRandomVideoService>(AppContainerTypes.IRandomVideoService);

    useEffect(() => {
        randomVideoService
            .getRandomVideo()
            .then((url) => {
                setVideoSource(url);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Video
                source={videoSource}
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
