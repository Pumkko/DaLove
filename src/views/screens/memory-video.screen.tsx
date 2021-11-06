import React, { useEffect } from 'react';
import Video from 'react-native-video';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { observer } from 'mobx-react';
import { useInjection } from 'inversify-react';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { MemoryVideoViewNavigationProp } from '../../navigation/navigation-types';
import { MemoryStoreService } from '../../services/stores/memory.store.service';

type Props = {
  navigation: MemoryVideoViewNavigationProp;
};

export const MemoryVideoScreen: React.FC<Props> = observer(
    ({ navigation }: Props) => {

        const memoryStoreService = useInjection<MemoryStoreService>(AppContainerTypes.MemoryStoreService);

        const width = Dimensions.get('screen').width;
        const height = Dimensions.get('screen').height;

        useEffect(() => {
            memoryStoreService.getRandomMemory();         
        }, []);

        if (memoryStoreService.hasValidMemorySource) {
            return (
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <Video
                        source={memoryStoreService.memorySource}
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
        } else {
            return (
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                    <ActivityIndicator size="large" />
                </View>
            );
        }
    }
);

export default MemoryVideoScreen;
