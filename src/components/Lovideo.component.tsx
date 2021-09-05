import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Dimensions } from 'react-native';

// @ts-ignore On peut ignorer l'erreur qui nous dit que react native video n'existe pas, c'est un faux positif
import Video from 'react-native-video'
import { RandomVideoService } from "../services/random-video.services";




export const Lovideo = ({ navigation }) => {


  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  let player: any

  const [randomVideo, setRandomVideo] = useState<any>(null);

  useEffect(() => {
    const service = new RandomVideoService();
    const videoName = service.getRandomVideo();
    setRandomVideo(videoName);
  });


  return (

    <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Video
          ref={(ref: any) => {
            player = ref
          }}
          source={randomVideo}
          resizeMode={'contain'}
          style={
            {
              aspectRatio: width / height,
              width: "100%"
            }
          }
          controls={true}
          autoplay={true}
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