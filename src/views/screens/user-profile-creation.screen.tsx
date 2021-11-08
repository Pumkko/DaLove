import { useInjection } from 'inversify-react';
import ImagePicker from 'react-native-image-crop-picker';
import React, { useEffect, useState } from 'react';
import { Text, Image, View, ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AppContainerTypes } from '../../inversify/app-container-types';
import MainViewStyle from '../../MainView.style';
import { RootStackParamList } from '../../navigation/navigation-types';
import { LoginStoreService } from '../../services/stores/login.store.service';
import { UserProfileCreationStyle } from './user-profile-creation.screen.style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

class AvatarRequire {
  static path = require('../../assets/images/blank_avatar.png');
}

export interface AvatarSource {
  uri: string;
  mimeType: string;
}

export type UserProfileCreationNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'UserProfileCreation'
>;

export const UserProfileCreationScreen: React.FC<UserProfileCreationNavigationProp> =
  ({ navigation }: UserProfileCreationNavigationProp) => {
      const loginStoreService = useInjection<LoginStoreService>(
          AppContainerTypes.LoginStoreService
      );

      const [uniqueUserName, setUniqueUserName] = useState('');
      const [displayName, setDisplayName] = useState('');
      const [imagePath, setImagePath] = useState<AvatarSource>(
          AvatarRequire.path
      );
      const [userNameAvailable, setuserNameAvailable] = useState<boolean | null>(
          null
      );

      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
          if (!uniqueUserName) {
              return;
          }

          const timeOutId = setTimeout(() => {
              loginStoreService
                  .isUsernameAvailable(uniqueUserName)
                  .then((isAvailable) => {
                      setuserNameAvailable(isAvailable);
                  });
          }, 500);

          return () => clearTimeout(timeOutId);
      }, [uniqueUserName]);

      return (
          <View style={UserProfileCreationStyle.container}>
              <TouchableOpacity
                  onPress={() => {
                      ImagePicker.openPicker({
                          width: 140,
                          height: 140,
                          cropping: true,
                          mediaType: 'photo',
                          cropperCircleOverlay: true,
                          includeBase64: true,
                      }).then((selectedImage) => {
                          const newSource: AvatarSource = {
                              uri: selectedImage.path,
                              mimeType: selectedImage.mime,
                          };
                          setImagePath(newSource);
                      });
                  }}
              >
                  <Image
                      style={UserProfileCreationStyle.avatarStyle}
                      source={imagePath}
                  ></Image>
              </TouchableOpacity>

              <View style={UserProfileCreationStyle.textBlock}>
                  <Text>Unique username</Text>
                  <TextInput
                      onChangeText={setUniqueUserName}
                      style={UserProfileCreationStyle.textInputStyle}
                  ></TextInput>
                  {userNameAvailable && <Text>Username is available !</Text>}
                  {userNameAvailable === false && (
                      <Text>Username is not available !</Text>
                  )}
              </View>
              <View style={UserProfileCreationStyle.textBlock}>
                  <Text>Display username</Text>
                  <TextInput
                      onChangeText={setDisplayName}
                      style={UserProfileCreationStyle.textInputStyle}
                  ></TextInput>
              </View>

              {userNameAvailable && (
                  <TouchableOpacity
                      style={[
                          MainViewStyle.loveButton,
                          UserProfileCreationStyle.submitButton,
                      ]}
                  >
                      <Text
                          style={[
                              MainViewStyle.loveButtonText,
                              UserProfileCreationStyle.submitButtonText,
                          ]}
                          onPress={async () => {
                              setIsLoading(true);
                              await loginStoreService.createUserProfile({
                                  uniqueUserName,
                                  displayName,
                              });
                              if (imagePath.uri) {
                                  await loginStoreService.storeAvatar(imagePath);
                              }
                              navigation.navigate('MainView');
                          }}
                      >
              Submit
                      </Text>
                  </TouchableOpacity>
              )}

              {isLoading && <ActivityIndicator size="large"></ActivityIndicator>}
          </View>
      );
  };
