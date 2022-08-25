import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import geniusdbapiService from "../services/geniusapi.service";
import Input from "../components/Input";
import SongList from "../components/SongList";
import { SongLight } from "../services/song.model";

interface HomeSearchScreenProps {
  songs: Array<SongLight>;
}

export default class HomeSearchScreen extends Component<NavigationProps,HomeSearchScreenProps> {
  state = {
    songs: [],
  };

  onInput = (text: string) => {
    geniusdbapiService.SearchAllSongs(text).then((songs: Array<SongLight>) => this.setState({ songs }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Input placeholder={"Entrez le nom d'une chanson"} onTap={this.onInput} />
        <SongList songsData={this.state.songs} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
