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
import TestView from './screens/TestView';
import UserContext from './context/UserContext';
import NoteView from './screens/NoteView';

const App = () => {
  const Stack = createNativeStackNavigator();

  const [user, setUser] = React.useState(null);
  return (
    <PaperProvider>
      <UserContext.Provider value={{user, setUser}}>
        <NavigationContainer>
          <StatusBar backgroundColor={COLORS.secondary} />
          <Stack.Navigator
            screenOptions={{headerShown: false, statusBarStyle: 'light'}}
            initialRouteName="Loading">
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Introduction" component={Introduction} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen
                options={({route}) => ({
                  title: route.params.lesson.name,
                  headerShown: true,
                  headerStyle: {backgroundColor: COLORS.dark},
                  headerTitleStyle: {color: COLORS.light},
                  headerBackTitleStyle: {tintColor: COLORS.light},
                })}
                name="LessonView"
                component={LessonView}
              />
              <Stack.Screen
                options={({route}) => ({
                  title: route.params.test.name,
                  headerShown: true,
                  headerStyle: {backgroundColor: COLORS.dark},
                  headerTitleStyle: {color: COLORS.light},
                  headerBackTitleStyle: {tintColor: COLORS.light},
                })}
                name="TestView"
                component={TestView}
              />
              <Stack.Screen
                name="NoteView"
                component={NoteView}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </PaperProvider>
  );
};

export default App;
