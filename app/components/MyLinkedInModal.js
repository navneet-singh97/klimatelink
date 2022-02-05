import React from 'react'
import {  Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinkedInModal from 'react-native-linkedin';



const MyLinkedInModal = () => {

    return (
        <LinkedInModal 
                permissions={['r_liteprofile']}
                clientID="8613e6z8ra2rpf"
                clientSecret="ocFZFbe8eXtd4uAE"
                redirectUri="https://www.theclimatelink.com/login-success"
                onSuccess={token => {
                    console.log(token, "token")
                    // fetchDetails_V1(token);
                }}
                onSignIn={res => console.log(res, "result")}
                onError={err => console.log(err, "errors")}
                shouldGetAccessToken={true}
        >
        
        </LinkedInModal>
    )
}

export default MyLinkedInModal
