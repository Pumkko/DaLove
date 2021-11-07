import React, { useEffect } from 'react';
import Video from 'react-native-video';
import { ActivityIndicator, Dimensions, Image, Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useInjection } from 'inversify-react';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { MemoryVideoViewNavigationProp } from '../../navigation/navigation-types';
import { MemoryStoreService } from '../../services/stores/memory.store.service';
import MemoryVideoScreenStyle from './memory-video.screen.style';

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
                <View style={{flex: 1, backgroundColor: 'black'  }}>
        
                    <Video
                        source={{ uri: memoryStoreService.memory.memoryUri }}
                        resizeMode={'contain'}
                        style={{
                            aspectRatio: width / height,
                            width: '100%'
                        }}
                        autoplay={true}
                        onEnd={() => {
                            navigation.goBack();
                        }}
                    />

                    <View style={{ marginTop: -150}}>

                        <Text style={MemoryVideoScreenStyle.sharedBy}>Shared by</Text>

                        <View style={MemoryVideoScreenStyle.creatorProfileContainer}>
                            {memoryStoreService.memory.creator.avatarUri ? (
                                <Image
                                    style={MemoryVideoScreenStyle.avatarStyle}
                                    source={{ uri: memoryStoreService.memory.creator.avatarUri }}
                                ></Image>
                            ) : (
                                <Image
                                    style={MemoryVideoScreenStyle.avatarStyle}
                                    source={require('../../assets/images/blank_avatar.png')}
                                ></Image>
                            )}

                            <View style={{height: 64, width: '100%'}}>
                                <Text style={MemoryVideoScreenStyle.displayName}>{memoryStoreService.memory.creator.displayName}</Text>
                                <Text style={MemoryVideoScreenStyle.uniqueName}>{memoryStoreService.memory.creator.uniqueUserName}</Text>
                            </View>
                        </View>
                    </View>
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
