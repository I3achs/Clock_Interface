import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';

const AlarmScreen = () => {
  const [alarms, setAlarms] = useState([
    { time: '07:00', label: 'Wake up!', enabled: true },
    { time: '07:15', label: 'Now really wake up!', enabled: false },
    { time: '08:00', label: 'Never mind...', enabled: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');

  // Request notification permissions
  useEffect(() => {
    Notifications.requestPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        alert('You need to enable notifications for alarms to work!');
      }
    });
  }, []);

  const toggleSwitch = (index) => {
    const updatedAlarms = [...alarms];
    updatedAlarms[index].enabled = !updatedAlarms[index].enabled;
    setAlarms(updatedAlarms);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      alarms.forEach((alarm) => {
        if (alarm.enabled && alarm.time === currentTime) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: 'Alarm',
              body: alarm.label,
            },
            trigger: null, // Trigger immediately
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms]);

  const addAlarm = () => {
    const formattedTime = `${selectedHour}:${selectedMinute}`;
    setAlarms([...alarms, { time: formattedTime, label: 'New Alarm', enabled: false }]);
    setModalVisible(false);
    setSelectedHour('09');
    setSelectedMinute('00');
  };

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <View style={styles.container}>
      {/* Danh sách báo thức trong ScrollView để có thể cuộn */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {alarms.map((alarm, index) => (
          <Animatable.View key={index} animation="fadeIn" style={styles.alarmRow}>
            <View>
              <Text style={styles.alarmTime}>{alarm.time}</Text>
              <Text style={styles.alarmLabel}>{alarm.label}</Text>
            </View>
            <Switch
              value={alarm.enabled}
              onValueChange={() => toggleSwitch(index)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={alarm.enabled ? '#f5dd4b' : '#f4f3f4'}
            />
          </Animatable.View>
        ))}
      </ScrollView>

      {/* Nút Add Alarm cố định ở phía dưới */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Alarm</Text>
      </TouchableOpacity>

      {/* Modal để chọn thời gian */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Alarm Time</Text>

            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={selectedHour}
                onValueChange={(itemValue) => setSelectedHour(itemValue)}
              >
                {hours.map((hour) => (
                  <Picker.Item key={hour} label={hour} value={hour} />
                ))}
              </Picker>
              <Text style={styles.colon}>:</Text>
              <Picker
                style={styles.picker}
                selectedValue={selectedMinute}
                onValueChange={(itemValue) => setSelectedMinute(itemValue)}
              >
                {minutes.map((minute) => (
                  <Picker.Item key={minute} label={minute} value={minute} />
                ))}
              </Picker>
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={addAlarm}>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Đảm bảo có khoảng trống cho nút Add Alarm
  },
  alarmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  alarmTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  alarmLabel: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    position: 'absolute', // Cố định nút ở phía dưới
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    width: 100,
    height: 150,
  },
  colon: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AlarmScreen;