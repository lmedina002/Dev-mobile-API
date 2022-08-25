import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Dimensions } from 'react-native';
import { Song } from '../services/song.model';
import { WebView } from 'react-native-webview';
import ArtistItem from './ArtistItem';
import AlbumItem from './AlbumItem';

export default class SongDetail extends Component {
    constructor(public props: {song: Song, navigation: StackNavigationProp<any,any>}) {
        super({});
      }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <ArtistItem artist={this.props.song.primary_artist} navigation={this.props.navigation}/>
                    <AlbumItem albumId={this.props.song.albumId} primaryArtist={this.props.song.primary_artist} navigation={this.props.navigation}/>
                    <View>
                        <Text style={styles.title}>Description de la chanson</Text>
                        {this.props.song.description === "?" ? <Text>Pas de description disponible</Text> : <Text>{this.props.song.description}</Text>}
                    </View>
                    <View style={{marginTop:25}}>
                        <Text style={styles.title}>Paroles de la chanson</Text>                    
                        <WebView source={{uri: this.props.song.url}} style={styles.web}/>
                    </View>                    
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        margin: 10,        
    },
    img:{
        height: 75,
        width: 75,
        resizeMode : 'stretch'
    },
    web:{
        marginTop:25,
        width: Dimensions.get('window').width*0.95,
        height: Dimensions.get('window').height*10,
    },
    title: {
        color: '#1e1d1e',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 15,
    }

})