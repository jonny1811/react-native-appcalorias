import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import { Button, Icon } from '@rneui/base';
import { Input } from '@rneui/themed';

import AddFoodModal from '../../components/AddFoodModal';
import Header from '../../components/Header';
import useFoodStorage from '../../hooks/useFoodStorage';
import { Meal } from '../../types';
import MealItem from '../../components/MealItem';

const AddFood = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [foods, setFoods] = useState<Meal[]>([]);
  const [search, setSearch] = useState<string>('');
  const { onGetFoods } = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFoods();
      setFoods(foodsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, [])

  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert('Comida guardada exitosamente');
      loadFoods();
    }
    setIsVisible(false);
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFoods();
      setFoods(
        result.filter((item: Meal) => 
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        ),
      );
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Add Food</Text>
        </View>
        <View style={styles.addFoodButtonContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="#FFF" />}
            radius="lg"
            color="#4ecb71"
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input 
            placeholder='apples, pie, soda...'
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          ></Input>
        </View>
        <Button 
          title="Search" 
          color="#ade8af" 
          titleStyle={styles.searchBtnTitle} 
          radius="lg" 
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map(meal => 
          <MealItem 
            key={`my-meal-item-${meal.name}`} 
            {...meal}
            isAbleToAdd
          />
        )}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFF',
    flex: 1,
  },
  addFoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  content: {

  },
  legendContainer: {
    flex: 1,
  },
  addFoodButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  addFoodLegend: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row'
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchBtnTitle: {
    color: '#000',
    fontSize: 14,
  }
});

export default AddFood