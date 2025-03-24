import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import các màn hình
import ClockScreen from './screens/ClockScreen';
import AlarmScreen from './screens/AlarmScreen';
import StopwatchScreen from './screens/StopwatchScreen';
import TimerScreen from './screens/TimerScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Clock') iconName = 'access-time';
            else if (route.name === 'Alarm') iconName = 'alarm';
            else if (route.name === 'Stopwatch') iconName = 'timer';
            else if (route.name === 'Timer') iconName = 'hourglass-empty';
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF6F61',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Clock" component={ClockScreen} />
        <Tab.Screen name="Alarm" component={AlarmScreen} />
        <Tab.Screen name="Stopwatch" component={StopwatchScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;