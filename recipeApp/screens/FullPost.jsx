import React from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Loading } from '../components/Loading';

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

const recipes = require('../assets/recipes.json');

export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const { id, title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      title,
    });
    var d = null;
    recipes.recipes.forEach(element => {
      if(element.id == id) {
        d = element;
      }
    });
    setData(d);
    setIsLoading(false);

  
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    );
  }

  const listIngredients = (l) => {
    
    return l.join(", ");
  };


  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri: data.imageUrl }} />
      <PostText><b>Ингредиенты: </b>{listIngredients(data.ingredients)}<br /></PostText>
      <PostText><br /><b>Рецепт: </b><br />{data.text}</PostText>

    </View>
  );
};
