import { StyleSheet } from 'react-native';

export const UploadMemoryStyle = StyleSheet.create({


    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10
    },

    memory: {
        alignSelf: 'center',
        width: '100%'
    },

    memoryCaption: {
        fontSize: 15
    },

    avatarStyle: {
        height: 32,
        width: 32,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10
    },

    recipientListItem: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10
    },

    displayName: {

    },

    uniqueName: {
        color: 'gray'
    },

    flatListHeader: {
        marginBottom: 10
    },

    buttonShareMemory: {
        alignSelf: 'center',
        marginBottom: 10,
        width: '60%',
        backgroundColor: 'palevioletred',
        borderRadius: 90,
        padding: 10,
    },

    buttonTextShareMemory: {
        color: 'white',
        textAlign: 'center'
    },
    nextStepButton: {
        margin: 10
    },

    nextStepText: {
        fontSize: 18
    }


});

export default UploadMemoryStyle;
