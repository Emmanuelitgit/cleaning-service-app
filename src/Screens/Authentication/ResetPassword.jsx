import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Image, Text, View, TextInput, Dimensions, ScrollView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Button from '../../Components/Button';
import axios from 'axios';
import { useState } from 'react';
import { LoadingModal } from "react-native-loading-modal";
import { SIZES } from '../../Constants/Theme';

const ResetPassword = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key,value) =>{
    if (key === 'newPassword') {
      setNewPassword(value);
    } else if (key === 'confirm') {
      setConfirm(value);
    }
  }

  // const handleReset = async () => {
  //   try {
  //     setLoading(true)
  //     if(newPassword === confirm){
  //       const response = await axios.post('https://cleaningservice.onrender.com/api/', {
  //         newPassword,
  //         confirm,
  //       });
  //       console.log('Password updated successful:', response.data);
  //       navigation.navigate('Login');
  //     }
  //   } catch (error) {
  //     setErr(error.message)
  //   }finally{
  //     setLoading(false)
  //   }
  // };

  
  const {
    container,
    imageContainer,
    image,
    welcomeContainer,
    welcomeTitle,
    welcomeText,
    inputContainer,
    input,
    buttonText,
    saveCancelBtn,
    cancelText,
    iconUser,
    scrollContainer,
    btnsContainer,
    inputField
  } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar backgroundColor={'#B3CDE0'} barStyle={'dark-content'} />
      <ScrollView style={scrollContainer}> 
      <View style={imageContainer}>
        <Image source={require("../../../assets/logo.png")} style={image} />
      </View>
      <View style={welcomeContainer}>
        <Text style={welcomeTitle}>Reset Pasword</Text>
        <Text style={welcomeText}>Ready to create new password? Please type something you can remember</Text>
      </View>
      <View style={inputContainer}>
        <View style={input}>
          <Feather name={'lock'} 
           size={20} color={'black'} 
           style={iconUser} />
          <TextInput
           style={inputField} 
           placeholder="New Password" 
           secureTextEntry
           onChangeText={(value)=>handleChange('newPassword', value)}
           />
        </View>
        <View style={input}>
          <Feather name={'lock'} 
           size={20} color={'black'} 
           style={iconUser} />
          <TextInput
           style={inputField} 
           placeholder="Confirm Password" 
           secureTextEntry 
           onChangeText={(value)=>handleChange('confirm', value)}
           />
        </View>
      </View>
      <View style={btnsContainer}>
        <Button title={'Save'} 
        buttonContainer={saveCancelBtn} 
        buttonText={buttonText}
        // press={handleReset}
        press={()=>navigation.navigate("Login")}
        />
        <Button title={'Cancel'} 
        buttonContainer={saveCancelBtn} 
        buttonText={cancelText}
        />
      </View>
      <Text style={styles.indicator}>
          {loading && <LoadingModal modalVisible={true} />} 
      </Text>
      </ScrollView> 
    </SafeAreaView>
  );
};
 
const window = Dimensions.get('window')
const height = window.height
const width = window.width
const buttonWidth = width * 0.3
const buttonWidth2 = width*0.3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B3CDE0",
    width: '100%',
    // marginTop: StatusBar.currentHeight || 0,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25
  },
  welcomeText: {
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
    width: 200
  },
  inputContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  inputField:{
    width:SIZES.width*0.8
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 240,
    padding: 7,
    borderRadius: 10,
    margin: 7,
    backgroundColor: 'white',
    color: 'black',
    marginVertical:10,
    width:SIZES.width*0.8,
    padding: SIZES.height*0.013,
  },
  btnsContainer:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:20
  },
  saveCancelBtn: {
    alignItems: 'center',
    margin:12
  },
  buttonText: {
    color: 'black',
    backgroundColor: 'white',
    width: buttonWidth,
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  cancelText: {
    color: 'white',
    backgroundColor: ' rgba(3, 57, 108, 1)',
    width: buttonWidth2,
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
    paddingTop: 10,
    overflow:'hidden'
  },
  iconUser: {
    margin:2,
    paddingRight:5,
    color:'#9CADF2',
    borderColor: '#DBE3FF', 
    borderRightWidth: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#B3CDE0",
    flexGrow: 1,
    paddingBottom:50,
    paddingTop:Platform.OS === "ios"? 100:0
  },
  indicator: {
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    top: SIZES.height * 0.78,
    left: SIZES.width * 0.43,
  },
});

export default ResetPassword;
