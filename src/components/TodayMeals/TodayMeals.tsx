import React, { FC } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import MealItem from '../MealItem';
import { Meal } from '../../types';

type TodayMealsProps = {
    foods: Meal[];
    onCompleteAddRemove?: () => void;
}

const TodayMeals: FC<TodayMealsProps> = ({ foods, onCompleteAddRemove }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Comidas</Text>
        <ScrollView style={styles.content}>
            {foods?.map((meal: Meal, index: number) => (
                <MealItem 
                    key={`today-meal-item-${meal.name}-${index}`} 
                    {...meal}
                    itemPosition={index}
                    onCompleteAddRemove={onCompleteAddRemove}
                />)
            )}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
    },
    title: {
        fontSize: 16,
    },
    content: {
        marginVertical: 16,
    },
});

export default TodayMeals;