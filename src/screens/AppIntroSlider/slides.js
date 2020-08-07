import react from 'react';
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1, 
        paddingTop: 20, 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20
    }, 

    title: {
        fontSize: 26, 
        color: '#fff', 
        fontWeight: 'bold',
        textAlign: 'center', 
        marginTop: 20, 
    }, 

    text: {
        color: '#fff', 
        fontSize: 20, 
    }, 

    image: {
        width: 200, 
        height: 200, 
        resizeMode: 'contain'
    }
})

export const Slides = [
    {
        key: 'k1',
        title: 'Find Vendor', 
        image: {
            uri: 'https://i.imgur.com/jr6pfzM.png',
        },
        titleStyle: styles.title, 
        imageStyle: styles.image, 
        backgroundColor: '#F7BB64',
    },
    {
        key: 'k2', 
        title: 'Make Payments', 
        image: {
            uri: 'https://i.imgur.com/bXgn893.png',
        },
        titleStyle: styles.title, 
        imageStyle: styles.image, 
        backgroundColor: '#4093D2',
    },
    {
        key: 'k3',
        title: 'Get Gas', 
        image: {
            uri: 'https://i.imgur.com/mFKL47j.png',
        },
        titleStyle: styles.title,
        imageStyle: styles.image,
        backgroundColor: '#644EE2',
    }
]