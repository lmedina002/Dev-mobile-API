import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList, NavigationProps } from "../navigation/app-stacks";
import { Song } from "../services/song.model";
import geniusdbapiService from "../services/geniusapi.service";
import SongDetail from "../components/SongDetail"

interface SongScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "Song">;
  id:number;
}

interface SongScreenState {
  isLoading: Boolean,
  song: Song;
}

export default class SongScreen extends Component<SongScreenProps,SongScreenState> {
  state = {
    isLoading: true,
    song : new Song(0,{id: 0, name: "", image_url: ""},"","","",{unrevised_annotations: 0, hot: false, views: 0},"",0),
  };

  componentDidMount() {
    const songId = this.props.route.params.songId;

  geniusdbapiService.SearchSongById(songId).then((song: Song) => { 
    this.props.navigation.setOptions({ title: song.title }); 
      
    this.setState({ isLoading: false, song });});
  }

  render() {
    if (this.state.isLoading) return <ActivityIndicator />;
    else {
      const { song } = this.state;

      return <SongDetail song={song} navigation={this.props.navigation}/>;
    }
  }
}

