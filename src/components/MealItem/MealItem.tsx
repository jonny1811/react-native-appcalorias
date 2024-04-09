import React, { FC } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import { Meal } from '../../types';
import { Button, Icon } from '@rneui/themed';
import useFoodStorage from '../../hooks/useFoodStorage';

type MealItemProps = Meal & {
  isAbleToAdd?: boolean;
  onCompleteAddRemove?: () => void;
  itemPosition: number;
}

const MealItem: FC<MealItemProps> = ({
  calories,
  name,
  portion,
  isAbleToAdd,
  itemPosition,
  onCompleteAddRemove,
}) => {
  const { onSaveTodayFood, onDeleteTodayFood } = useFoodStorage();

  const handleIconPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({ calories, name, portion });
        Alert.alert('Comida agregada al dia');
      } else {
        await onDeleteTodayFood(itemPosition ?? -1);
        Alert.alert('Comida eliminada');
      }

      onCompleteAddRemove?.();
    } catch (error) {
      console.error(error);
      Alert.alert('Comida no agregada al dia');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          icon={<Icon name={isAbleToAdd ? "add-circle-outline" : "close"} />}
          type="clear"
          style={styles.iconButton}
          onPress={handleIconPress}
        />
        <Text style={styles.calories}>{calories} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ade8af',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  portion: {
    fontSize: 13,
    color: '#808080',
    fontWeight: '500',
  },
  calories: {
    fontSize: 18,
  },
  iconButton: {
    marginBottom: -8,
  },
});

export default MealItem;