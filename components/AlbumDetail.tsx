import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Dimensions, Image } from 'react-native';
import { Album } from '../services/album.model';
import ArtistItem from './ArtistItem';
import { Primary_artist } from '../services/song.model';
import ProductionDetail from './ProductionDetail';

export default class AlbumDetail extends Component {
    constructor(public props: {album: Album, primaryArtist: Primary_artist, navigation: StackNavigationProp<any,any>}) {
        super({});
      }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={{uri: this.props.album.image}} style={styles.img}/>
                    <ArtistItem artist={this.props.primaryArtist} navigation={this.props.navigation}/>
                </View>
                <View style={styles.container}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.title}>Date de sortie:</Text>
                        <Text>  {this.props.album.releaseDate}</Text>
                    </View>
                    <Text style={styles.title}>{'\n'}Participants à la production de cet album: </Text>
                    <ProductionDetail production={this.props.album.production} navigation={this.props.navigation}/>
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
        height: 150,
        width: 150,
        resizeMode : 'stretch',
        borderRadius: 500,
        marginBottom: 25
    },
    title: {
        color: '#1e1d1e',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 15,
    }

})