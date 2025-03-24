import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';

const ClockScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Africa/Dakar');

  // Danh sách các thành phố và múi giờ tương ứng
  const [cities, setCities] = useState([
    { name: 'Dakar', timezone: 'Africa/Dakar' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Queensland', timezone: 'Australia/Queensland' },
    { name: 'Barcelona', timezone: 'Europe/Madrid' },
  ]);

  // Danh sách múi giờ để người dùng chọn
  const availableTimezones = [
    { name: 'Dakar', timezone: 'Africa/Dakar' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Queensland', timezone: 'Australia/Queensland' },
    { name: 'Barcelona', timezone: 'Europe/Madrid' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
  ];

  // Cập nhật thời gian mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Kiểm tra và gửi thông báo khi thời gian của một khu vực đạt 12:00
  const checkForNotification = () => {
    cities.forEach((city) => {
      const cityTime = new Date().toLocaleTimeString('en-US', {
        timeZone: city.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      if (cityTime === '12:00') {
        Notifications.scheduleNotificationAsync({
          content: {
            title: `Time in ${city.name}`,
            body: `It's 12:00 in ${city.name}!`,
          },
          trigger: null,
        });
      }
    });
  };

  useEffect(() => {
    checkForNotification();
  }, [currentTime]);

  // Lấy giờ của một khu vực theo múi giờ
  const getCityTime = (timezone) => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // Thêm khu vực mới khi người dùng nhấn "Add"
  const addCity = () => {
    const cityToAdd = availableTimezones.find((city) => city.timezone === selectedCity);
    if (cityToAdd && !cities.some((city) => city.timezone === cityToAdd.timezone)) {
      setCities([...cities, cityToAdd]);
    }
    setModalVisible(false);
  };

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
            <Text style={styles.cityTime}>{getCityTime(city.timezone)}</Text>
          </Animatable.View>
        ))}
      </View>

      <TouchableOpacity style={styles.setButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.setButtonText}>Set Clock</Text>
      </TouchableOpacity>

      {/* Modal để chọn khu vực */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select City</Text>

            <Picker
              style={styles.picker}
              selectedValue={selectedCity}
              onValueChange={(itemValue) => setSelectedCity(itemValue)}
            >
              {availableTimezones.map((city) => (
                <Picker.Item key={city.timezone} label={city.name} value={city.timezone} />
              ))}
            </Picker>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={addCity}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  picker: { width: 200, height: 150 },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 },
  modalButton: { backgroundColor: '#FF6F61', padding: 10, borderRadius: 10, width: '45%', alignItems: 'center' },
  modalButtonText: { color: '#fff', fontSize: 16 },
});

export default ClockScreen;