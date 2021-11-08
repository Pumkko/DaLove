import { observer } from 'mobx-react';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { LoginStoreService } from '../../services/stores/login.store.service';
import LoadingComponentStyle from './loading.component.style';

type Props = {
  loginStoreService: LoginStoreService;
};

export const LoadingComponent: React.FC<Props> = observer(
    ({ loginStoreService }: Props) => {
        if (loginStoreService.errorDuringLogin) {
            return (
                <View style={LoadingComponentStyle.container}>
                    <Text>An error has occured during login, try again later</Text>
                </View>
            );
        }

        return (
            <View style={LoadingComponentStyle.container}>
                <ActivityIndicator size='large' color='pink'></ActivityIndicator>
                <Text style={LoadingComponentStyle.daloveText}>DaLove</Text>
            </View>
        );
    }
);
