import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Lesson from '../screens/Lessons';
import Test from '../screens/Test';
import Notes from '../screens/Notes';
import {COLORS, icons} from '../constants';
import {Image, View, Text, TouchableOpacity} from 'react-native';

const TabBarCustomButton = ({children, onPress, accessibilityState}) => {
  return (
    <TouchableOpacity
      style={{
        top: accessibilityState.selected ? -45 : -40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: accessibilityState.selected ? 12 : 8,
        backgroundColor: accessibilityState.selected
          ? COLORS.primary
          : COLORS.dark,
        width: 75,
        height: 75,
        borderRadius: 40,
        paddingTop: 12,
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Lesson"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          elevation: 0,
          backgroundColor: COLORS.dark,
          borderTopColor: COLORS.secondary,
          height: 75,
        },
      }}>
      <Tab.Screen
        name="Lesson"
        component={Lesson}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.lesson}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              <Text
                style={{color: focused ? COLORS.primary : COLORS.lightGray}}>
                Dersler
              </Text>
            </View>
          ),
          title: '',
        }}
      />
      <Tab.Screen
        name="Test"
        component={Test}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.test}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                }}
              />
              <Text style={{color: focused ? COLORS.dark : COLORS.lightGray}}>
                Testler
              </Text>
            </View>
          ),
          title: '',
          tabBarButton: props => {
            return <TabBarCustomButton {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.notes}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={{color: focused ? COLORS.primary : COLORS.lightGray}}>
                Notlar
              </Text>
            </View>
          ),
          title: '',
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
