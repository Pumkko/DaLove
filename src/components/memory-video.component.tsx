import React from 'react';
import Video from 'react-native-video';
import { Dimensions, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigation-types';
import { observer } from 'mobx-react';
import { MemoryVideoComponentParams } from '../navigation/memory-video-component.params';
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MemoryVideo'
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
    route: {
        params: MemoryVideoComponentParams
    };
};

export const MemoryVideoComponent: React.FC<Props> = observer(({ route, navigation }: Props) => {
    const width = Dimensions.get('screen').width;
    const height = Dimensions.get('screen').height;

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Video
                source={route.params.randomVideoStoreService.source}
                resizeMode={'contain'}
                style={{
                    aspectRatio: width / height,
                    width: '100%',
                }}
                controls={true}
                autoplay={true}
                onEnd={() => {
                    navigation.goBack();
                }}
            />
        </View>
    );
});

export default MemoryVideoComponent;
