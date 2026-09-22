import { View } from "react-native";

import { Slot } from "expo-router";

import { useFonts } from "expo-font";

import {
  SafeAreaProvider,
} from "react-native-safe-area-context";


const PublicLayout = () => {

  const [loadedFont] = useFonts({

    Cairo: require(
      "@/assets/Fonts/Global.ttf"
    ),

  });


  if (!loadedFont) {

    return <View />;

  }


  return (

    <SafeAreaProvider>

      <Slot />

    </SafeAreaProvider>

  );

};


export default PublicLayout;