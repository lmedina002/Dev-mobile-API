import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Album } from '../services/album.model';
import geniusdbapiService from "../services/geniusapi.service";
import { Primary_artist } from '../services/song.model';

export default class AlbumItem extends Component {
    constructor(public props: {albumId: number, navigation: StackNavigationProp<any,any>, primaryArtist: Primary_artist}) {
        super({});
    }

    state = {
        album: new Album(0,"",0,"","","",[]),
    };

    _onTap() {
        this.props.navigation.navigate("Album",{album: this.state.album, primaryArtist: this.props.primaryArtist})
    };

    componentDidMount() {
        const albumId = this.props.albumId;
    
        geniusdbapiService.SearchAlbumById(albumId).then((album: Album) => {this.setState({ album })});
      }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.container} onPress={()=>this._onTap()}> 
                    <Image source={{uri: this.state.album.image}} style={styles.img}/>
                    <Text style={styles.text}>Album :{this.state.album.title}</Text>
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
        borderColor: '#700824',
        borderWidth: 2,
        borderRadius: 70,
        padding: 10,
        backgroundColor: '#700824',
        width: Dimensions.get('window').width*0.70      
    },
    img:{
        height: 75,
        width: 75,
        maxWidth: Dimensions.get('window').width*0.3,
        resizeMode : 'stretch',
        borderRadius: 500,
    },
    text:{
        color: 'white',
        maxWidth: Dimensions.get('window').width*0.4
    }
})