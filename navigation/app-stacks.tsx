import React from "react";
import { createStackNavigator, StackNavigationOptions, StackNavigationProp} from "@react-navigation/stack";
import HomeSearchScreen from "../screens/HomeSearchScreen";
import SongScreen from "../screens/SongScreen";
import ArtistScreen from "../screens/ArtistScreen";
import AlbumScreen from "../screens/AlbumScreen";
import { Album } from '../services/album.model';
import { Primary_artist } from "../services/song.model";
import { StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Define view (screen) names and associated params
export type RootStackParamList = {
  Songs: undefined;
  Artist: { artistId: number };
  Song: { songId: number };
  Album: { album: Album, primaryArtist: Primary_artist };
};

// Base interface for all components using the navigation object
export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, any>;
}

//Header options
const stackScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#1e1d1e"
  },
  headerTintColor: "white",
  headerTitleStyle: {
    color: "white",
    fontWeight: "bold"
  },
  headerTitleAlign: "center",  
};

const SongsStack = createStackNavigator<RootStackParamList>();

export const SongsStackScreen = () => {
  return (
      <SongsStack.Navigator screenOptions={stackScreenOptions}> 
        <SongsStack.Screen name="Songs" component={HomeSearchScreen} options={({navigation}) => ({ title: "Lyrapp", headerRight: () => <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Songs")}><Image style={styles.img} source={require('../images/home.png')}/></TouchableOpacity>})}/>
        <SongsStack.Screen name="Song" component={SongScreen} options={({navigation}) => ({ headerRight: () => <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Songs")}><Image style={styles.img} source={require('../images/home.png')}/></TouchableOpacity>})}/>
        <SongsStack.Screen name="Artist" component={ArtistScreen} options={({navigation}) => ({ headerRight: () => <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Songs")}><Image style={styles.img} source={require('../images/home.png')}/></TouchableOpacity>})}/>
        <SongsStack.Screen name="Album" component={AlbumScreen} options={({navigation}) => ({ headerRight: () => <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Songs")}><Image style={styles.img} source={require('../images/home.png')}/></TouchableOpacity>})}/>
      </SongsStack.Navigator>
  );
};

const styles = StyleSheet.create({
  img:{
      height: 50,
      width: 50,
      resizeMode : 'stretch'
  },
  btn: {
    marginRight:10
  }
})
