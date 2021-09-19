import { StyleSheet } from 'react-native';

const MainViewStyle = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },

    background: {
        width: '100%',
        height: '100%'
    },

    loginButton: {
        alignSelf: 'flex-end',
        padding: 10
    },

    loginButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    },

    loveButton: {
        alignSelf: 'center',
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