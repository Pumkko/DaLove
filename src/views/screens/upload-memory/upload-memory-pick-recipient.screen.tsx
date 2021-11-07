import { observer } from 'mobx-react';
import React from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    ListRenderItem,
} from 'react-native';
import { UserProfile } from '../../../data/user-profile';
import { PickMemoryRecipientProp } from '../../../navigation/navigation-types';
import { UploadMemoryStoreService } from '../../../services/stores/upload-memory.store.service';
import MemoryRecipientFlatItemComponent from '../../components/memory-recipient-flat-item.component';
import UploadMemoryStyle from './upload-memory.style';


export const UploadMemoryPickRecipientScreen: React.FC<PickMemoryRecipientProp> = observer(
    ({ route, navigation }: PickMemoryRecipientProp) => {

        let currentTimer: NodeJS.Timeout;

        const uploadMemoryStoreService = route.params.uploadMemoryStoreService;

        const renderProfile: ListRenderItem<UserProfile> = ({ item }) => {
            return (
                <MemoryRecipientFlatItemComponent
                    item={item}
                    uploadMemoryStoreService={uploadMemoryStoreService}
                ></MemoryRecipientFlatItemComponent>
            );
        };

        return (
            <View>
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

                {uploadMemoryStoreService.selectedRecipients.length !== 0 && (
                    <TouchableOpacity style={UploadMemoryStyle.buttonShareMemory} onPress={
                        () => {
                            uploadMemoryStoreService.uploadMemory();
                        }
                    }>
                        <Text style={UploadMemoryStyle.buttonTextShareMemory}>
              Share my memory !
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
);
