import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Primary_artist } from '../services/song.model';

export default class ArtistItem extends Component {
    constructor(public props: {artist: Primary_artist, navigation: StackNavigationProp<any,any>}) {
        super({});
    }

    _onTap() {
        this.props.navigation.navigate("Artist",{artistId: this.props.artist.id})
    };

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.container} onPress={()=>this._onTap()}> 
                    <Image source={{uri: this.props.artist.image_url}} style={styles.img}/>
                    <Text style={styles.text}>{this.props.artist.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        height: 95,
        margin: 10,
        marginBottom: 25,
        borderColor: '#474641',
        borderWidth: 2,
        borderRadius: 70,
        padding: 10,
        backgroundColor: '#474641',
        width: Dimensions.get('window').width*0.70      
    },
    img:{
        height: 75,
        width: 75,
        resizeMode : 'stretch',
        borderRadius: 500,
    },
    text:{
        fontWeight: 'bold',
        color: 'white'
    }
})