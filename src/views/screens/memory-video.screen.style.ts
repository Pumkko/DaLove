import { StyleSheet } from 'react-native';


export const MemoryVideoScreenStyle = StyleSheet.create({
    creatorProfileContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },

    avatarStyle: {
        height: 32,
        width: 32,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 10
    },

    displayName: {
        color: 'white',
        fontWeight: 'bold'
    },

    uniqueName: {
        color: 'white'
    },

    sharedBy: {
        marginLeft: 10,
        color: 'white'
    }

});

export default MemoryVideoScreenStyle;