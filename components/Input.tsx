import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Touchable, TouchableOpacity, TextInput, TextInputSubmitEditingEventData, NativeSyntheticEvent } from 'react-native';

export default class Input extends Component {
    constructor(public props: {onTap: (arg0: string) => void, placeholder : string}) {
        super(props);
    }

    state = {
        search: "",
    };

    _onSubmitText = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        this.props.onTap(event.nativeEvent.text);
    };

    _onTouch = (event: string) => {
        this.props.onTap(event);
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.text} placeholder={this.props.placeholder} onChangeText={(value) => this.setState({ search: value })} onSubmitEditing={this._onSubmitText}/>
                <TouchableOpacity onPress={() => this._onTouch(this.state.search)} style={styles.btn}>
                    <Text style={styles.btnText}>Rechercher</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {       
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#474641',
        flexDirection: 'row',
        height: 60,
        width: Dimensions.get('window').width,        
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    btn: {
        backgroundColor: '#876a20',
        borderWidth: 2,
        borderColor: '#1e1d1e',
        height: 40,
        padding: 10,
        marginRight: 10,
        borderRadius: 5, 
    },
    btnText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'    
    }

})