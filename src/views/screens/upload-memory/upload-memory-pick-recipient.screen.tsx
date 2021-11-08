import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    ListRenderItem,
    ActivityIndicator,
} from 'react-native';
import { UserProfile } from '../../../data/user-profile';
import { RootStackParamList } from '../../../navigation/navigation-types';
import MemoryRecipientFlatItemComponent from '../../components/memory-recipient-flat-item.component';
import UploadMemoryStyle from './upload-memory.style';


export type PickMemoryRecipientProp = NativeStackScreenProps<
  RootStackParamList,
  'PickMemoryRecipient'
>


export const UploadMemoryPickRecipientScreen: React.FC<PickMemoryRecipientProp> =
  observer(({ route, navigation }: PickMemoryRecipientProp) => {
      let currentTimer: NodeJS.Timeout;

      const uploadMemoryStoreService = route.params.uploadMemoryStoreService;


      const [isLoading, setIsLoading] = useState(false);

      const renderProfile: ListRenderItem<UserProfile> = ({ item }) => {
          return (
              <MemoryRecipientFlatItemComponent
                  item={item}
                  uploadMemoryStoreService={uploadMemoryStoreService}
              ></MemoryRecipientFlatItemComponent>
          );
      };

      useEffect(() => {
          uploadMemoryStoreService.getPossibleRecipientList('');
      }, []);

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
                  <TouchableOpacity
                      style={UploadMemoryStyle.buttonShareMemory}
                      onPress={() => {
                          setIsLoading(true);
                          uploadMemoryStoreService.uploadMemory().then(() => {
                              navigation.navigate('MainView');
                          });
                      }}
                  >
                      <Text style={UploadMemoryStyle.buttonTextShareMemory}>
              Share my memory !
                      </Text>
                  </TouchableOpacity>
              )}
              {isLoading && <ActivityIndicator size="large"></ActivityIndicator>}
          </View>
      );
  });
