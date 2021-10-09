import React from 'react';
import Video from 'react-native-video';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigation-types';
import { observer } from 'mobx-react';
import { MemoryVideoComponentParams } from '../navigation/memory-video-component.params';
import { RouteParams } from '../navigation/route.params';
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MemoryVideo'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: RouteParams<MemoryVideoComponentParams>;
};

export const MemoryVideoComponent: React.FC<Props> = observer(
    ({ route, navigation }: Props) => {
        const width = Dimensions.get('screen').width;
        const height = Dimensions.get('screen').height;

        
        if(route.params.memoryStoreService.hasValidMemorySource){
            return (
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <Video
                        source={route.params.memoryStoreService.memorySource}
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
        }
        else {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            );

        }
    }
);

export default MemoryVideoComponent;
