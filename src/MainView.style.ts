import { StyleSheet } from 'react-native';

const MainViewStyle = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    bottomContainer: {
        alignSelf: 'center' ,
        flexDirection: 'row',
    },

    background: {
        width: '100%',
        height: '100%'
    },

    loginComponent: {
        alignSelf: 'flex-end',
        padding: 10
    },

    loveButton: {
        width: '60%',
        height: 40,
        padding: 10,
        backgroundColor: 'palevioletred',
        borderRadius: 90,
        marginBottom: 20,
        marginRight: 20
    },

    loveButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15
    },

    uploadMemoryButton: {
        width: '10%',
        marginBottom: 20,
        borderRadius: 90,
    },

    uploadMemoryImage: {
        alignSelf: 'center',
        height: 48,
        width: 48,
    }

});


export default MainViewStyle;