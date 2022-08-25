import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList, NavigationProps } from "../navigation/app-stacks";
import Artist from "../services/artist.model";
import geniusdbapiService from "../services/geniusapi.service";
import ArtistDetail from "../components/ArtistDetail";

interface ArtistScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "Artist">;
}

interface ArtistScreenState {
  isLoading: Boolean,
  artist: Artist;
}

export default class ArtistScreen extends Component<ArtistScreenProps,ArtistScreenState> {
  state = {
    isLoading: true,
    artist: new Artist(0,"","","",""),
  };

  componentDidMount() {
    const artistId = this.props.route.params.artistId;

    geniusdbapiService.SearchArtistById(artistId).then((artist: Artist) => {
      // Update screen title
      this.props.navigation.setOptions({ title: artist.name });

      this.setState({ artist, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) return <ActivityIndicator />;
    else {
      const { artist } = this.state;
      console.log(artist)

      return <ArtistDetail artist={artist} navigation={this.props.navigation}/>;
    }
  }
}
