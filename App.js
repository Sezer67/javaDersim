import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { COLORS } from './constants';
import Introduction from './screens/Introduction';
import Loading from './screens/Loading';
import Login from './screens/Login';
import Register from './screens/Register';


const App = () =>{
  const Stack = createNativeStackNavigator();
  return(
    <NavigationContainer >
      <StatusBar backgroundColor={COLORS.secondary} />
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Loading" >
        <Stack.Screen name='Loading' component={Loading} />
        <Stack.Screen name='Introduction' component={Introduction} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;