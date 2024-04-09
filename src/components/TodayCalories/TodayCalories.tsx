import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

export type TodayCaloriesProps = {
  total: number | string;
  consumed: number | string;
  remaining: number | string;
  percentage: number;
}

const TodayCalories: FC<TodayCaloriesProps> = ({
  total,
  consumed,
  remaining,
  percentage
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CircularProgress
          value={percentage}
          valueSuffix="%"
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.today}>Today</Text>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLegend}>Total</Text>
          <Text style={styles.rightItemValue}>{total}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLegend}>Consumed</Text>
          <Text style={styles.rightItemValue}>{consumed}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLegend}>Remaining</Text>
          <Text style={styles.rightItemValue}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  today: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 14,
  },
  rightItemLegend: {
    flex: 1,
  },
  rightItemValue: {
    flex: 1,
    textAlign: 'right',
  },
});

export default TodayCalories;