import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Animatable from 'react-native-animatable';

const StopwatchScreen = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={(time % 60) * (100 / 60)}
        tintColor="#FF6F61"
        backgroundColor="#3d5875"
      >
        {() => (
          <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.timeText}>
            {formatTime(time)}
          </Animatable.Text>
        )}
      </AnimatedCircularProgress>

      <View style={styles.lapContainer}>
        {laps.map((lap, index) => (
          <Animatable.View key={index} animation="fadeInUp" style={styles.lapRow}>
            <Text style={styles.lapText}>Lap {index + 1}</Text>
            <Text style={styles.lapTime}>{formatTime(lap)}</Text>
          </Animatable.View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={isRunning ? addLap : reset}>
          <Text style={styles.buttonText}>{isRunning ? 'Lap' : 'Reset'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={startStop}>
          <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50, backgroundColor: '#fff' },
  timeText: { fontSize: 40, fontWeight: 'bold', color: '#333' },
  lapContainer: { marginTop: 30, width: '80%' },
  lapRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  lapText: { fontSize: 18, color: '#333' },
  lapTime: { fontSize: 18, color: '#333' },
  buttonContainer: { flexDirection: 'row', marginTop: 20 },
  controlButton: { backgroundColor: '#FF6F61', padding: 15, borderRadius: 50, marginHorizontal: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default StopwatchScreen;