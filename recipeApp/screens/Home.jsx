import React from 'react';
import {
  Alert,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Post } from '../components/Post';
import Icon from "react-native-vector-icons/FontAwesome";


const recipes = require('../assets/recipes.json');


export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState();
  const [search, setSearch] = React.useState(null);

  const filterList = (item) => {
    const newList = recipes.recipes.filter((val) => val.searchIngredients.join(' ').toLocaleLowerCase().includes(item.toLocaleLowerCase()));
    setItems(newList);
  }

  const fetchPosts = () => {
    setIsLoading(true);
    setItems(recipes.recipes);
    setIsLoading(false);
  };

  React.useEffect(() => {
    if(search !== null) {
      filterList(search);
    } 
    else {
      fetchPosts();
    }
  }, [search]);

  // React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 15 }}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View>

      <View style={styles.search}>
        <View style={styles.icon}>
          <Icon name="search" size={20} color='#FFFFFF' />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={(val) => setSearch(val)}
        />
      </View>

      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
            <Post title={item.title} imageUrl={item.imageUrl}/>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#EBE9E9',
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: '#004c4c',
    padding: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  listItem: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#F3F0F0',
    padding: 10,
    borderRadius: 5,
  },
  listText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
})