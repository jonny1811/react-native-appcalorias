import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParams } from '../types';
import Home from '../views/Home';
import AddFood from '../views/AddFood';

const Stack = createNativeStackNavigator<RootStackParams>();
const routeScreenDefaultOptions = {
    headerStyle: {
        backgroundColor: 'rgba(7,26,93,255)',
    },
    headerTitleStyle: {
        color: '#FFF'
    }
}

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
                <Stack.Screen name='Home' component={Home} options={routeScreenDefaultOptions} />
                <Stack.Screen name='AddFood' component={AddFood} options={routeScreenDefaultOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;