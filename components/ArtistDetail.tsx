import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Dimensions, Image } from 'react-native';
import Artist from '../services/artist.model';

export default class ArtistDetail extends Component {
    constructor(public props: {artist: Artist, navigation: StackNavigationProp<any,any>}) {
        super({});
      }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={{uri: this.props.artist.image}} style={styles.img}/>
                    <View>
                        <Text style={styles.title}>Présentation de l'artiste</Text>
                        {this.props.artist.description === "?" ? <Text>Pas de description disponible</Text> : <Text>{this.props.artist.description}</Text>}
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