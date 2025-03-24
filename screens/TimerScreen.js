import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Animatable from 'react-native-animatable';

const TimerScreen = () => {
  const [totalTime, setTotalTime] = useState(45 * 60); // 45 phút
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const addTime = () => {
    setTotalTime(totalTime + 5 * 60); // Thêm 5 phút
    setTimeLeft(timeLeft + 5 * 60);
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
        fill={(timeLeft / totalTime) * 100}
        tintColor="#FF6F61"
        backgroundColor="#3d5875"
      >
        {() => (
          <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.timeText}>
            {formatTime(timeLeft)}
          </Animatable.Text>
        )}
      </AnimatedCircularProgress>

      <Text style={styles.totalTime}>{formatTime(totalTime)}</Text>

      <TouchableOpacity style={styles.addButton} onPress={addTime}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
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
  totalTime: { fontSize: 18, color: '#333', marginTop: 20 },
  addButton: { backgroundColor: '#81b0ff', padding: 15, borderRadius: 50, marginTop: 20 },
  addButtonText: { color: '#fff', fontSize: 24 },
  buttonContainer: { flexDirection: 'row', marginTop: 20 },
  controlButton: { backgroundColor: '#FF6F61', padding: 15, borderRadius: 50, marginHorizontal: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default TimerScreen;