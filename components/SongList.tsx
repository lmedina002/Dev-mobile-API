import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { SongLight } from '../services/song.model';
import SongItem from './SongItem';

export default class SongList extends Component {
    constructor(public props: {songsData: Array<SongLight>, navigation: StackNavigationProp<any,any>}) {
        super({});
      }
    

    renderItem = ({ item }: {item: SongLight}) => {
        return <SongItem song={item} navigation={this.props.navigation}/>;
    };

    render() {
        if(this.props.songsData.length != 0)
        {
            return (
                <View style={styles.flatlist}>
                    <FlatList data={this.props.songsData} keyExtractor={(item) => item.id.toString()} renderItem={this.renderItem}/>
                </View>                
            )
        }
        else
        {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Aucun résultat pour cette recherche</Text>  
                </View>              
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 150,   
    },
    text:{
        fontSize: 20,
        color: "#1e1d1e"
    },
    flatlist: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})