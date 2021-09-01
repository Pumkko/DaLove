import React, {useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [displayCorrectAnswer, setDisplayCorrectAnswer] = useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      
      <Text testID='riddleText'>When someone say my name, i disappear, who am I ?</Text>

      <TextInput testID='inputRiddleAnswer' style={{width: '90%', borderColor: 'gray', borderWidth: 1}} ></TextInput>

      <Button 
        testID='submitRiddleAnswer'
        title='Submit answer'
        onPress={
          () => {
            setDisplayCorrectAnswer(true);
          }
        }
      ></Button>

      {
        displayCorrectAnswer && 
        <Text testID="correctAnswerText">Correct ! </Text>
      }
    </View>
  );
};

export default App;
