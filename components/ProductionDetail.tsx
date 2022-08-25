import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Producteur } from '../services/album.model';

export default class ProductionDetail extends Component {
    constructor(public props: {production: Array<Producteur>, navigation: StackNavigationProp<any,any>}) {
        super({});
    }

    _onTap(id: number) {
        this.props.navigation.navigate("Artist",{artistId: id})
    };

    render() {

        //Contruction du tableau des différents rôles
        const roles: String[] = []
        this.props.production.forEach((producteur) =>  (roles.includes(producteur.role) ? null : roles.push(producteur.role)))
        console.log(roles)

        return (
            <View style={styles.container}>
                {roles.map((value, index) => (
                    <View key={index} style={styles.subContainer}>
                        <Text key={index} style={styles.title}>{value}</Text>
                        {this.props.production.map((producteur) => (
                            producteur.role === value ? <TouchableOpacity key={producteur.id} onPress={() => this._onTap(producteur.id)}><Text key={producteur.id}>- {producteur.name}</Text></TouchableOpacity> : null
                        ))}
                    </View>))}
                <View></View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        margin: 10,
        width: Dimensions.get('window').width*0.85        
    },
    subContainer: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginVertical: 5,
        paddingLeft: 10        
    },
    title: {
        color: '#1e1d1e',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 15,
    }
})