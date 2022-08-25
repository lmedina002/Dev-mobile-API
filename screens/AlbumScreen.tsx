import React, { Component } from "react";
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList, NavigationProps } from "../navigation/app-stacks";
import { Album } from "../services/album.model";
import AlbumDetail from "../components/AlbumDetail";

interface AlbumScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "Album">;
}

interface AlbumScreenState {
  album: Album;
}

export default class AlbumScreen extends Component<AlbumScreenProps,AlbumScreenState> {
  state = {
    album: new Album(0,"",0,"","","",[]),
  };

  render() {
    const album = this.props.route.params.album;
    const primaryArtist = this.props.route.params.primaryArtist;
    console.log(album)

    // Update screen title
    this.props.navigation.setOptions({ title: album.title });

    return <AlbumDetail album={album} primaryArtist={primaryArtist} navigation={this.props.navigation}/>;
    
  }
}
