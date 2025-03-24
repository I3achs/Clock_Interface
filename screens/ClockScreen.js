import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PushNotification from 'react-native-push-notification';
import * as Animatable from 'react-native-animatable';

const ClockScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const cities = [
    { name: 'Dakar', offset: 0 },
    { name: 'Tokyo', offset: 9 },
    { name: 'Queensland', offset: 10 },
    { name: 'Barcelona', offset: 1 },
  ];

  const getCityTime = (offset) => {
    const cityTime = new Date(currentTime.getTime() + offset * 3600 * 1000);
    return cityTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const checkForNotification = () => {
    cities.forEach((city) => {
      const cityTime = getCityTime(city.offset);
      if (cityTime === '12:00') {
        PushNotification.localNotification({
          channelId: 'default_channel_id',
          title: `Time in ${city.name}`,
          message: `It's 12:00 in ${city.name}!`,
        });
      }
    });
  };

  useEffect(() => {
    checkForNotification();
  }, [currentTime]);

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={(currentTime.getSeconds() / 60) * 100}
        tintColor="#FF6F61"
        backgroundColor="#3d5875"
      >
        {() => (
          <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.timeText}>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Animatable.Text>
        )}
      </AnimatedCircularProgress>

      <View style={styles.cityContainer}>
        {cities.map((city, index) => (
          <Animatable.View key={index} animation="fadeInUp" delay={index * 200} style={styles.cityRow}>
            <Text style={styles.cityName}>{city.name}</Text>
            <Text style={styles.cityTime}>{getCityTime(city.offset)}</Text>
          </Animatable.View>
        ))}
      </View>

      <TouchableOpacity style={styles.setButton}>
        <Text style={styles.setButtonText}>Set Clock</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50, backgroundColor: '#fff' },
  timeText: { fontSize: 40, fontWeight: 'bold', color: '#333' },
  cityContainer: { marginTop: 30, width: '80%' },
  cityRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  cityName: { fontSize: 18, color: '#333' },
  cityTime: { fontSize: 18, color: '#333' },
  setButton: { backgroundColor: '#FF6F61', padding: 10, borderRadius: 20, marginTop: 20 },
  setButtonText: { color: '#fff', fontSize: 16 },
});

export default ClockScreen;