import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from "./components/header"
import React, {useState} from "react";
import ListItem from './components/list';
import Form from './components/form';
// import {ImageBackground} from 'react-native';


export default function App() {
  const [listOfItems, setListOfItems] = useState([
    {text: "Купить", key: "1"},
    {text: "Помыть", key: "2"},
    {text: "Сделать", key: "3"},
  ])

  const addHandler = (text) => {
    setListOfItems((list) => {
      return[
        {text: text, key: Math.random().toString(36).substring(7)},
        ...list
      ];
    });
  };
  const deleteHandler = (key) => {
    setListOfItems((list) => {
      return list.filter((listOfItems) => listOfItems.key != key);
    });
  };

  return (
    <View style={styles.header}>
      {/* <ImageBackground source="./assets/background.png" resizeMode="cover" style={styles.image}> */}
      <Header />
      <Form addHandler={addHandler}/>
      <FlatList
        data = {listOfItems}
        renderItem = {({ item }) => (
        <ListItem el={item} deleteHandler={deleteHandler}/>
      )}
      />
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    flex:1,
    backgroundColor: '#eee2dc',
    
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  }
});
