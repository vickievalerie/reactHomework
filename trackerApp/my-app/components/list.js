import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function ListItem ({el, deleteHandler}){
    return(
        <TouchableOpacity onPress={() => deleteHandler(el.key)}>
            <Text style={styles.text}>{el.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text:{
        padding: 10,
        textAlign:"center",
        borderRadius:5,
        backgroundColor: "#edc7b7",
        // borderWidth: 1, 
        marginTop: 20,
        width: "60%",
        height: 40,
        marginLeft: "20%",
    },
})

