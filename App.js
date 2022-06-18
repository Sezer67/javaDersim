import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {COLORS} from './constants';
import Tabs from './navigation/Tabs';
import Introduction from './screens/Introduction';
import {Provider as PaperProvider} from 'react-native-paper';
import Loading from './screens/Loading';
import Login from './screens/Login';
import Register from './screens/Register';
import LessonView from './screens/LessonView';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.secondary} />
        <Stack.Navigator
          screenOptions={{headerShown: false,statusBarStyle:"light"}}
          initialRouteName="Loading">
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Introduction" component={Introduction} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Lesson" component={Tabs} />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              options={({route})=>({
                title:route.params.lesson.name,
                headerShown:true,
                headerStyle:{backgroundColor:COLORS.dark},
                headerTitleStyle:{color:COLORS.light},
                headerBackTitleStyle:{tintColor:COLORS.light}
              })}
              name="LessonView"
              component={LessonView}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
