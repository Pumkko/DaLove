import React from "react";
import { View } from "react-native";
import { Dimensions } from 'react-native';

// @ts-ignore On peut ignorer l'erreur qui nous dit que react native video n'existe pas, c'est un faux positif
import Video from 'react-native-video'




export const Lovideo = ({navigation, route}) => {


  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const video = `../assets/videos/${route.params.videoName}`;
  let player: any

  return (

    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Video
        ref={(ref: any) => {
          player = ref
        }}        
        source={require('../assets/videos/julian.mp4')}
        resizeMode={'contain'}
        style={
          {
            aspectRatio: width / height,
            width: "100%"
          }
        }
        controls={true}
        onEnd={
          () => {
            navigation.navigate('MainView');
          }
        }
      />
    </View>
  );
}


export default Lovideo;