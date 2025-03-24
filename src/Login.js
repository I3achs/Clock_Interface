import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons'; // Import icons

export default function Login() {  
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State để ẩn/hiện mật khẩu

  return (  
    <View style={styles.container}>  
      <Text style={styles.title}>Welcome to my test app</Text>  
      <Text style={styles.subtitle}>Enter your Phone number or Email address for sign in. Enjoy your food.</Text>  

      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={20} color="gray" />
        <TextInput style={styles.input} placeholder="Username" />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={20} color="gray" />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          secureTextEntry={!passwordVisible} 
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Feather name={passwordVisible ? "eye" : "eye-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberMeContainer}>  
        <Switch value={rememberMe} onValueChange={() => setRememberMe(!rememberMe)} />  
        <Text>Remember Me</Text>  
      </View>  

      <TouchableOpacity style={styles.button}>  
        <FontAwesome name="sign-in" size={20} color="white" />
        <Text style={styles.buttonText}> Sign In</Text>  
      </TouchableOpacity>  

      <Text style={styles.link}>Forget Password?</Text>  
      
      <Text style={styles.footer}>
        Don't have an account? <Text style={styles.signUp}>Signup</Text>
      </Text>  
      <Text style={styles.orText}>OR</Text>  

      <TouchableOpacity style={styles.socialButton}>  
        <FontAwesome name="facebook" size={20} color="#3b5998"/>
        <Text style={styles.socialText}> Connect With Facebook</Text>  
      </TouchableOpacity>  

      <TouchableOpacity style={styles.socialButton}>  
        <FontAwesome name="google" size={20} color="#db4437" />
        <Text style={styles.socialText}> Connect With Google</Text>  
      </TouchableOpacity>  

      <StatusBar style="auto" />  
    </View>  
  );  
}  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    padding: 20,  
    justifyContent: 'center',  
  },  
  title: {  
    fontSize: 24,  
    fontWeight: 'bold',  
  },  
  subtitle: {  
    marginVertical: 10,  
    fontSize: 14,  
  },  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {  
    flex: 1,
    marginLeft: 10,
  },  
  rememberMeContainer: {  
    flexDirection: 'row',  
    alignItems: 'center',  
    marginBottom: 10,  
  },  
  button: {  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',  
    padding: 15,  
    borderRadius: 5,  
    marginVertical: 10,  
  },  
  buttonText: {  
    color: '#fff',  
    textAlign: 'center',  
    fontSize: 16,
  },  
  link: {  
    textAlign: 'center',  
  },  
  footer: {  
    textAlign: 'center',  
    marginVertical: 10,  
  },  
  signUp: {  
    color: '#007BFF',  
  },  
  orText: {  
    textAlign: 'center',  
    marginVertical: 10,  
  },  
  socialButton: {  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',  
    padding: 15,  
    borderRadius: 5,  
    marginVertical: 5,  
  },  
  socialText: {  
    textAlign: 'center',  
    marginLeft: 10,
  },  
});  
