import { StyleSheet } from "react-native";

const MainViewStyle = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    background: {
        width: '100%',
        height: '100%'
    },

    loveButton: {
        width: '60%',
        padding: 10,
        marginBottom: 20,
        backgroundColor: 'palevioletred',
        borderRadius: 90,
    },

    loveButtonText: {
        textAlign: 'center',
        color: 'white'
    }


});


export default MainViewStyle;