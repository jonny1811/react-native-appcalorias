import React, { useCallback, useState } from 'react';

import { View, StyleSheet, Text } from 'react-native';
import { Button, Icon } from '@rneui/themed';

import Header from '../../components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Meal, RootStackParams } from '../../types';
import useFoodStorage from '../../hooks/useFoodStorage';
import TodayCalories, { TodayCaloriesProps } from '../../components/TodayCalories';
import TodayMeals from '../../components/TodayMeals';

const TOTAL_CALORIES_PER_DAY = 2000;

const Home = () => {
  const [todayFood, setTodayFood] = useState<Meal[]>([]);
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>({ 
    consumed: 0, 
    percentage: 0, 
    remaining: 0, 
    total: TOTAL_CALORIES_PER_DAY, 
  });
  const { onGetTodayFoods } = useFoodStorage();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParams, 'Home'>>();

  const calculateTodayStatistics = (meals: Meal[]) => {
    try {
      const caloriesConsumed = meals.reduce(
        (acum, curr) => acum + Number(curr.calories),
        0,
      );
      const remainingCalories = TOTAL_CALORIES_PER_DAY - caloriesConsumed;
      const percentage = (caloriesConsumed / TOTAL_CALORIES_PER_DAY) * 100;

      setTodayStatistics({
        total: TOTAL_CALORIES_PER_DAY,
        consumed: caloriesConsumed,
        percentage,
        remaining: remainingCalories,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = (await onGetTodayFoods() as Meal[]);

      calculateTodayStatistics(todayFoodResponse);
      setTodayFood(todayFoodResponse);
    } catch (error) {
      setTodayFood([]);
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood]),
  );

  const handleAddCaloriesPress = () => {
    navigate('AddFood');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calories</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="#FFF" />}
            radius="lg"
            color="#4ecb71"
            onPress={handleAddCaloriesPress}
          />
        </View>
      </View>
      <TodayCalories {...todayStatistics} />
      <TodayMeals foods={todayFood} onCompleteAddRemove={() => loadTodayFood()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFF',
    flex: 1,
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  caloriesLegend: {
    fontSize: 20,
  }
});

export default Home