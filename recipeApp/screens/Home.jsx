import React from 'react';
import {
  Alert,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  // RefreshControl,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Post } from '../components/Post';
import Icon from "react-native-vector-icons/FontAwesome";
import { Dropdown } from 'react-native-element-dropdown';



const recipes = require('../assets/recipes.json');
const allIngredients = recipes.recipes.flatMap(recipe => recipe.searchIngredients);
const uniqueIngredients = [...new Set(allIngredients)].map(ingredient => ({
  label: ingredient,
  value: ingredient
}));

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState();
  const [search, setSearch] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const filterList = (item) => {
    const newList = recipes.recipes.filter((val) => val.searchIngredients.join(' ').toLocaleLowerCase().includes(item.toLocaleLowerCase()));
    setItems(newList);
  }

  // const fetchPosts = () => {
  //   setIsLoading(true);
  //   setItems(recipes.recipes);
  //   setIsLoading(false);
  // };

  React.useEffect(() => {
    setIsLoading(true);
    var data = recipes.recipes;
    if(value !== null) {
      data = data.filter((val) => val.searchIngredients.join(' ').toLocaleLowerCase().includes(value.label.toLocaleLowerCase()));
    }
    if(search !== null) {
      data = data.filter((val) => val.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }
    setItems(data);
    setIsLoading(false);

    // if(search !== null) {
    //   filterList(search);
    // } 
    // else {
    //   fetchPosts();
    // }
  }, [search, value]);

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
    <View style={styles.container}>

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

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={uniqueIngredients}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Ингредиент"
        searchPlaceholder="Поиск..."
        value={value}
        onChange={item => {
          setValue(item);
        }}
        renderRightIcon={() => (
          <Icon name="chevron-down" size={18} color='#213555' />
        )}
      />

      <FlatList
        style = {{ backgroundColor: '#F5EFE7'}}
        //refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
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
  container: {
    backgroundColor:'#F5EFE7',
  },
  search: {
    backgroundColor: '#D8C4B6',
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

  dropdown: {
    margin: 20,
    marginTop: 0,
    height: 50,
    borderBottomColor: '#3E5879',
    borderBottomWidth: 0.5,
    
  },
  iconDrop: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})