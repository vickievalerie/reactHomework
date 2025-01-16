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
          placeholder="Поиск..."
          onChangeText={(val) => setSearch(val)}
        />
      </View>

      <FlatList
        style = {{ backgroundColor: '#F5EFE7'}}
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
    backgroundColor: '#C4D9FF',
    margin: 10,
    marginLeft: 15,
    marginRight : 15,
    borderRadius: 12,
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: '#213555',
    padding: 15,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
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
    padding: 15,
    borderRadius: 5,
  },
})