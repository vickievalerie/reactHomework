import React, { useState } from "react";
import { StyleSheet, TextInput, Text, Button, View, TouchableOpacity } from "react-native";


export default function Form({addHandler}){
    const[text, setValue] = useState("");
    const onChange = (text) => {
        setValue(text)
    }

    return(
        <View>
            <TextInput style = {styles.input} onChangeText = {onChange} placeholder="Впишите задачу"/>
            {/* <Button
            style = {styles.button}
            onPress={() => addHandler(text)}
            title="Добавить задачу..."/> */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => addHandler(text)}>
                <Text style={styles.buttonText}>Добавить задачу...</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius:5,
        backgroundColor: 'lightgray',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        width: "60%",
        marginLeft: "20%",
        marginTop: 10,
      },
      
    input:{
        padding:"20px",
        textAlign:"center",
        
        borderWidth: 0, 
        borderBottomWidth: 1,
        marginTop: 20,
        width: "60%",
        marginLeft: "20%",
    },
    inputFocused: {
        borderWidth: 1,
      },
});