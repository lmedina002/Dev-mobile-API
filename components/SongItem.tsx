import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { SongLight } from '../services/song.model'
import { StackNavigationProp } from "@react-navigation/stack";

export default class SongItem extends Component {
    constructor(public props: {song: SongLight, navigation: StackNavigationProp<any,any>}) {
        super(props);
    }

    _onTapSong() {
        this.props.navigation.navigate("Song",{songId: this.props.song.id})
    };

    _onTapArtist() {
        this.props.navigation.navigate("Artist",{artistId: this.props.song.primary_artist.id})
    };

    //Séparation de l'artiste du titre de la chanson (Api renvoie 'titre by artist') et on tronque le texte si trop long
    render() {
        if((this.props.song.title.indexOf(this.props.song.primary_artist.name)-4) != -5)
        {
            return (
                
                <View>
                    <TouchableOpacity style={styles.container} onPress={()=>this._onTapSong()}> 
                        <Image style={styles.img} source={{uri : this.props.song.image}}/>
                        <View>    
                            <Text style={styles.text}>{this.props.song.title.substring(0,this.props.song.title.indexOf(this.props.song.primary_artist.name)-4)}</Text>
                            <TouchableOpacity onPress={()=>this._onTapArtist()}>
                                <Text style={styles.artist}>{this.props.song.primary_artist.name}</Text> 
                            </TouchableOpacity>
                        </View>                                   
                    </TouchableOpacity>
                </View>
            )
        }
        else if(this.props.song.title.length <= 25) 
        {
            return (
                
                <View>
                    <TouchableOpacity style={styles.container} onPress={()=>this._onTapSong()}> 
                        <Image style={styles.img} source={{uri : this.props.song.image}}/>       
                        <View>              
                            <Text style={styles.text}>{this.props.song.title}</Text>                        
                            <TouchableOpacity onPress={()=>this._onTapArtist()}>
                                <Text style={styles.artist}>{this.props.song.primary_artist.name}</Text> 
                            </TouchableOpacity>
                        </View>                                       
                    </TouchableOpacity>
                </View>
            )

        }
        else
        {
            return (
                
                <View>
                    <TouchableOpacity style={styles.container} onPress={()=>this._onTapSong()}> 
                        <Image style={styles.img} source={{uri : this.props.song.image}}/>
                        <View>                   
                            <Text style={styles.text}>{this.props.song.title.substring(0,25).concat(' ...')}</Text>
                            <TouchableOpacity onPress={()=>this._onTapArtist()}>
                                <Text style={styles.artist}>{this.props.song.primary_artist.name}</Text> 
                            </TouchableOpacity>
                        </View>                                         
                    </TouchableOpacity>
                </View>
            )

        }
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: Dimensions.get("window").width*0.85,
        margin: 10,
        borderColor: '#1e1d1e',
        borderWidth: 1,
        borderRadius:5,
        backgroundColor:'#474641',
        padding:10      
    },
    img:{
        height: 75,
        width: 75,
        resizeMode : 'stretch'
    },
    text:{
        color: "white",
        fontWeight: 'bold',
    },
    artist:{
        color: "#cc6216",
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
    
})
