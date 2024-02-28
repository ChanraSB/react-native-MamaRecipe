import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Input from '../../component/input/Input';
import Card from '../../component/Card';
import HorizontalCard from '../../component/HorizontalCard';

const Home = ({ page, pageSize, setPage}) => { 
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const getRecipe = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://10.0.2.2:3000/recipes?page=${page}&pageSize=${pageSize}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch recipes data');
      }
      const data = await res.json();
      console.log(data.data.recipe);
      setRecipe(prevRecipe => [...prevRecipe, ...data.data.recipe]);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Error', err.message);
    }
  };

  useEffect(() => {
    getRecipe();
  }, [page, pageSize]);

  const handleLoadMore = () => {
    setPage(page + 1); 
  };
  const navigateToDetail = (recipe) => {
    navigation.navigate('DetailRecipe', { recipe }); 
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetail(item)}>
      <HorizontalCard key={item.id} image={item.image} title={item.title} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Input placeholder="Search Pasta, Bread, etc " />
      <Text style={styles.title}>New Recipe</Text>
      <FlatList
        horizontal
        data={recipe}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetail(item)}>
            <Card key={item.id} image={item.image} title={item.title} />
          </TouchableOpacity>
        )}
      />
      <Text style={styles.title}>Popular Recipe</Text>
      <FlatList
        data={recipe}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:"center",
    width: '100%',
    marginLeft:"auto",
    marginRight:"auto",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3F3A3A',
    textAlign: 'left',
  },
});

export default Home;