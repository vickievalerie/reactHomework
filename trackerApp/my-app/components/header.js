import React from "react";
import { StyleSheet, View, Text} from "react-native";




export default function Header(){
    return(
        <View style = {styles.main}>
            <Text style={styles.text}>Список дел</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:"#123c69",
        padding:"20px",
        marginTop: 20,

    },
    text: {
        textAlign:"center",
        fontSize: 30,
        color:"white",
        display: "flex",
        marginTop: 10,
        marginBottom: 10,


    },
})