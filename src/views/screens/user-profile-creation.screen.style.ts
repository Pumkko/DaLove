import { StyleSheet } from 'react-native';


export const UserProfileCreationStyle = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        margin: 10
    },

    avatarStyle: {
        width: 140,
        height: 140,
        borderRadius: 90,
        overflow: 'hidden',
        alignSelf: 'center',
        marginBottom: 20
    },

    /**
     * A Text block is designed to apply to a view holding a Text and a Text Input
     */
    textBlock: {
        marginBottom: 50
    },

    /**
     * Should be applied to a textInput (within a textblock but not necessarily)
     */
    textInputStyle: {
        borderBottomWidth: 1
    },

    submitButton: {
    },

    submitButtonText: {
        fontSize: 25
    }

});
