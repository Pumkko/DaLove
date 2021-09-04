import React from "react";

// @ts-ignore On peut ignorer l'erreur qui nous dit que react native video n'existe pas, c'est un faux positif
import Video from 'react-native-video'

export const Lovideo = () => {
  return (

    <Video
    source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1' }}
    style={{ width: '100%', height: '100%' }}
    controls={true}
   />
  );
}


export default Lovideo;