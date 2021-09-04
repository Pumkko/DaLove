import React from "react";

// @ts-ignore On peut ignorer l'erreur qui nous dit que react native video n'existe pas, c'est un faux positif
import Video from 'react-native-video'

export const Lovideo = ({ navigation }) => {
  return (

    <Video
      source={require('../assets/videos/julian.mp4')}
      style={{ width: '100%', height: '100%' }}
      controls={true}
      onEnd={
        () => {
          navigation.navigate('MainView');
        }
      }
    />
  );
}


export default Lovideo;