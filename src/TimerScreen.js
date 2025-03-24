// TimerScreen.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const TimerScreen = () => {
  return (
    <View style={styles.container}>
      {/* Màn hình 1 */}
      <View style={styles.screen}>
        <ImageBackground
          source={{ uri: 'https://example.com/background-image.jpg' }}
          style={styles.background}
          imageStyle={{ opacity: 0.1 }}
        >
          <View style={styles.circleContainer}>
            <Progress.Circle
              size={200}
              progress={0.75}
              showsText={true}
              color="#FF4D4D"
              unfilledColor="#E0E0E0"
              borderWidth={0}
              thickness={10}
              textStyle={styles.progressText}
              formatText={() => '07:00'}
            />
          </View>
          <Text style={styles.label}>Work</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#FF4D4D' }]}>
              <Icon name="play-arrow" size={30} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#2196F3' }]}>
              <Icon name="stop" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Màn hình 2 */}
      <View style={styles.screen}>
        <ImageBackground
          source={{ uri: 'https://example.com/background-image.jpg' }}
          style={styles.background}
          imageStyle={{ opacity: 0.1 }}
        >
          <View style={styles.circleContainer}>
            <Progress.Circle
              size={200}
              progress={0.5}
              showsText={true}
              color="#FF9800"
              unfilledColor="#E0E0E0"
              borderWidth={0}
              thickness={10}
              textStyle={styles.progressText}
              formatText={() => '05:00'}
            />
          </View>
          <Text style={styles.label}>Break</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#FF9800' }]}>
              <Icon name="play-arrow" size={30} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#2196F3' }]}>
              <Icon name="stop" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Màn hình 3 */}
      <View style={styles.screen}>
        <ImageBackground
          source={{ uri: 'https://example.com/background-image.jpg' }}
          style={styles.background}
          imageStyle={{ opacity: 0.1 }}
        >
          <View style={styles.circleContainer}>
            <Progress.Circle
              size={200}
              progress={0.25}
              showsText={true}
              color="#4CAF50"
              unfilledColor="#E0E0E0"
              borderWidth={0}
              thickness={10}
              textStyle={styles.progressText}
              formatText={() => '03:00'}
            />
          </View>
          <Text style={styles.label}>Rest</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]}>
              <Icon name="play-arrow" size={30} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#2196F3' }]}>
              <Icon name="stop" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1E1E2F',
    padding: 10,
  },
  screen: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimerScreen;