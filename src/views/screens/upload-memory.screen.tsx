import React from 'react';
import { Text } from 'react-native';
import { UserProfileCreationNavigationProp } from '../../navigation/navigation-types';

type Props = {
  navigation: UserProfileCreationNavigationProp;
};

export const UploadMemoryScreen: React.FC<Props> = ({
    navigation,
}: Props) => {

    return (
        <Text>Works</Text>
    );

};
