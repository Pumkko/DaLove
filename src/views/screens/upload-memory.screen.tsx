import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ListRenderItem, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import { UserProfile } from '../../data/user-profile';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { UserProfileCreationNavigationProp } from '../../navigation/navigation-types';
import { UploadMemoryStoreService } from '../../services/stores/upload-memory.store.service';
import MemoryRecipientFlatItemComponent from '../components/memory-recipient-flat-item.component';
import UploadMemoryStyle from './upload-memory.style';

type Props = {
  navigation: UserProfileCreationNavigationProp;
};

export const UploadMemoryScreen: React.FC<Props> = observer(
    ({ navigation }: Props) => {
        const uploadMemoryStoreService = useInjection<UploadMemoryStoreService>(
            AppContainerTypes.UploadMemoryStoreService
        );

        let currentTimer: NodeJS.Timeout;

        useEffect(() => {
            uploadMemoryStoreService.pickVideoToUplaod();
        }, []);

        const renderProfile: ListRenderItem<UserProfile> = ({ item }) => {
            return (
                <MemoryRecipientFlatItemComponent
                    item={item}
                ></MemoryRecipientFlatItemComponent>
            );
        };

        if (uploadMemoryStoreService.hasPickedAMemory) {
            return (
                <View style={UploadMemoryStyle.container}>
                    <View>
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
                        ></TextInput>

                        {uploadMemoryStoreService.selectedRecipients.length !== 0 && (
                            <Text style={UploadMemoryStyle.flatListHeader}>
                You will share this memory with
                            </Text>
                        )}

                        <FlatList
                            data={uploadMemoryStoreService.selectedRecipients}
                            renderItem={renderProfile}
                            keyExtractor={(item) => item.uniqueUserName}
                        />

                        <TextInput
                            placeholder="Find someone to share your memory with"
                            onChangeText={(text) => {
                                clearTimeout(currentTimer);
                                currentTimer = setTimeout(() => {
                                    uploadMemoryStoreService.getPossibleRecipientList(text);
                                }, 500);
                            }}
                        ></TextInput>

                        <FlatList
                            data={uploadMemoryStoreService.possibleRecipients}
                            renderItem={renderProfile}
                            keyExtractor={(item) => item.uniqueUserName}
                        />
                    </View>

                    {uploadMemoryStoreService.selectedRecipients.length !== 0 && (
                        <TouchableOpacity style={UploadMemoryStyle.buttonShareMemory}>
                            <Text style={UploadMemoryStyle.buttonTextShareMemory}>
                Share my memory !
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            );
        } else {
            return <Text>No video selected</Text>;
        }
    }
);
