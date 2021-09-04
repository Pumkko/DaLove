import React from "react";
import { Text, ImageBackground, Touchable, TouchableOpacity, View } from "react-native";
import MainViewStyle from "./MainView.style";

export const MainView = () => {
  return (

      <ImageBackground 
        source={require('./assets/images/Lake.jpg')}
        style={MainViewStyle.background}>

        <View style={MainViewStyle.container}>
          <TouchableOpacity style={MainViewStyle.loveButton}>
            <Text style={MainViewStyle.loveButtonText}>I need some love</Text>
          </TouchableOpacity>
        </View>


      </ImageBackground>
  );
}


export default MainView;