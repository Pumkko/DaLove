import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { TouchableOpacity, Text, SafeAreaView, TextInput } from 'react-native';
import Video from 'react-native-video';
import { AppContainerTypes } from '../../../inversify/app-container-types';
import { RootStackParamList } from '../../../navigation/navigation-types';
import { UploadMemoryStoreService } from '../../../services/stores/upload-memory.store.service';
import UploadMemoryStyle from './upload-memory.style';


export type UploadMemoryNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'UploadMemory'
>

export const UploadMemoryScreen: React.FC<UploadMemoryNavigationProp> = observer(
    ({ navigation }: UploadMemoryNavigationProp) => {
        const uploadMemoryStoreService = useInjection<UploadMemoryStoreService>(
            AppContainerTypes.UploadMemoryStoreService
        );

        React.useLayoutEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        style={UploadMemoryStyle.nextStepButton}
                        onPress={() => {
                            navigation.navigate('PickMemoryRecipient', {
                                uploadMemoryStoreService: uploadMemoryStoreService
                            });
                        }}
                    >
                        <Text style={UploadMemoryStyle.nextStepText}
                        >Next</Text>
                    </TouchableOpacity>
                ),
            });
        }, [navigation]);

        useEffect(() => {
            uploadMemoryStoreService.pickVideoToUplaod().then(v => {
                if(!v){
                    navigation.navigate('MainView');
                }
            });
        }, []);

        if (uploadMemoryStoreService.hasPickedAMemory) {
            return (
                <SafeAreaView style={UploadMemoryStyle.container}>
                    <Video
                        source={{ uri: uploadMemoryStoreService.memoryToSend.path }}
                        resizeMode={'contain'}
                        style={[
                            UploadMemoryStyle.memory,
                            {
                                aspectRatio:
                  uploadMemoryStoreService.memoryToSend.width /
                  uploadMemoryStoreService.memoryToSend.height,
                            },
                        ]}
                        controls={true}
                        paused={true}
                    />
                    <TextInput
                        style={UploadMemoryStyle.memoryCaption}
                        placeholder="Write a caption"
                        multiline={true}
                        onChangeText={(newValue) => {
                            uploadMemoryStoreService.memoryCaption = newValue;
                        }}
                    ></TextInput>
                </SafeAreaView>
            );
        } else {
            return <Text>No video selected</Text>;
        }
    }
);
