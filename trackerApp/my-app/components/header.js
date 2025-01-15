import React from "react";
import { StyleSheet, View, Text} from "react-native";
import { useFonts } from "expo-font";
import { Raleway_200ExtraLight } from "@expo-google-fonts/raleway";
import { Montserrat_200ExtraLight } from "@expo-google-fonts/montserrat";



export default function Header(){
    return(
        <View style = {styles.main}>
            <Text style={styles.text}>Список дел</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:"black",
        padding:"20px",

    },
    text: {
        fontFamily: "Montserrat_200ExtraLight",
        textAlign:"center",
        fontSize: 25,
        color:"white",
        //fontWeight:"800",
        display: "flex",
        marginLeft: "20%",
    },
})