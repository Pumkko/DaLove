import React, { useEffect, useState } from 'react';

import Video from 'react-native-video';
import {
    IRandomVideoService,
    VideoSource,
} from '../services/random-video.services';
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

export const Lovideo: React.FC<Props> = ({ navigation }: Props) => {
    const width = Dimensions.get('screen').width;
    const height = Dimensions.get('screen').height;

    const randomVideoService = useInjection<IRandomVideoService>(
        AppContainerTypes.IRandomVideoService
    );

    useEffect(() => {
        randomVideoService.getRandomVideo();
    });

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Video
                source={{
                    uri: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4',
                }}
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
