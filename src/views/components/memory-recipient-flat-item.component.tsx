import { useInjection } from 'inversify-react';
import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { UserProfile } from '../../data/user-profile';
import { AppContainerTypes } from '../../inversify/app-container-types';
import { UploadMemoryStoreService } from '../../services/stores/upload-memory.store.service';
import UploadMemoryStyle from '../screens/upload-memory/upload-memory.style';

type Props = {
  item: UserProfile;
  uploadMemoryStoreService: UploadMemoryStoreService
};

const MemoryRecipientFlatItemComponent: React.FC<Props> = ({ item, uploadMemoryStoreService }: Props) => {

    return (
        <TouchableOpacity
            onPress={() => {
                uploadMemoryStoreService.addOrRemoveSelectedRecipient(item);
            }}
        >
            <View style={UploadMemoryStyle.recipientListItem}>
                {item.avatarUri ? (
                    <Image
                        style={UploadMemoryStyle.avatarStyle}
                        source={{ uri: item.avatarUri }}
                    ></Image>
                ) : (
                    <Image
                        style={UploadMemoryStyle.avatarStyle}
                        source={require('../../assets/images/blank_avatar.png')}
                    ></Image>
                )}
                <View>
                    <Text style={UploadMemoryStyle.displayName}>{item.displayName}</Text>
                    <Text style={UploadMemoryStyle.uniqueName}>
                        {item.uniqueUserName}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MemoryRecipientFlatItemComponent;
