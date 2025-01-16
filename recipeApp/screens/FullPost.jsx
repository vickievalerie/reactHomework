import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Loading } from '../components/Loading';

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

const BoldPostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
  font-weight: 800;
  margin-top: 10px;
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
    <View style={{ padding: 20, backgroundColor:'#F5EFE7' }}>
      <PostImage source={{ uri: data.imageUrl }} />
      {/* <PostText><Text><b>Ингредиенты: </b></Text>{listIngredients(data.ingredients)}</PostText>
      <PostText><Text><br /><br /><b>Рецепт: </b><br /></Text>{data.text}</PostText> */}
      <BoldPostText>Ингредиенты: </BoldPostText>
      <PostText>{listIngredients(data.ingredients)}</PostText>
      <BoldPostText>Рецепт: </BoldPostText>
      <PostText>{data.text}</PostText>


    </View>
  );
};
