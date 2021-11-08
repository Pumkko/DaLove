import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import { Props } from 'react';
import { RootStackParamList } from '../../navigation/navigation-types';



export type LoadingScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'LoadingScreen'
>;



export const LoadingScreen: React.FC<LoadingScreenNavigationProp> = observer(
    ({ navigation }: LoadingScreenNavigationProp) => {
        return null;
    }
);