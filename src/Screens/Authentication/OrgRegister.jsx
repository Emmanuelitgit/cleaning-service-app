import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  Image,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, Octicons } from '@expo/vector-icons';
import Button from '../../Components/Button';
import { SIZES } from '../../Constants/Theme';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { LoadingModal } from 'react-native-loading-modal';
import axios from 'axios';

const OrgRegister = ({ navigation }) => {
  const [organization_name, setOrganization_name] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user_type, setUserType] = useState('service_provider');
  const [loading, setLoading] = useState(false);
  const [organization_logo, setOrganization_logo] = useState(null);

  const handleChange = (key, value) => {
    if (key === 'organization_name') {
      setOrganization_name(value);
    } else if (key === 'password') {
      setPassword(value);
    } else if (key === 'email') {
      setEmail(value);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setOrganization_logo(result.assets[0].uri);
    }
  };

  // const handleCreateAccount = async () => {
  //   try {
  //     setLoading(true);
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailRegex.test(email)) {
  //       Alert.alert('Warning ⚠️', 'Please enter a valid email address');
  //       setLoading(false);
  //       return;
  //     }
  //     const formData = new FormData();
  //     formData.append('email', email);
  //     formData.append('password', password);
  //     formData.append('organization_name', organization_name);
  //     formData.append('user_type', user_type);
  //     formData.append('organization_logo', {
  //       uri: organization_logo,
  //       name: 'organization_logo.jpg',
  //       type: 'image/jpeg',
  //     });
  //     const response = await axios.post(
  //       'https://cleaningservice.onrender.com/api/accounts/create/',
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );
  //     if(email === '' && password === ''){
  //       Alert.alert("Warning⚠️", "Please email and password are required")
  //     }
  //     else if (response.status === 201) {
  //       await AsyncStorage.setItem('userRegistered', email);
  //       await AsyncStorage.setItem('user_type', user_type);
  //       Alert.alert('Success ✔️', 'Organization created successful');
  //       navigation.navigate('OTP');
  //     }
  //     else if (response.status === 208) {
  //       Alert.alert('Warning ⚠️', 'User already exists');
  //     }
  //   } catch (error) {
  //     Alert.alert("Warning ⚠️", "Something went wrong")
  //     console.log(error);
  //     setLoading(false);
  //     setEmail('');
  //     setPassword('');
  //     setOrganization_name('');
  //     setOrganization_logo('');
  //   } finally {
  //     setLoading(false);
  //     setEmail('');
  //     setPassword('');
  //     setOrganization_name('');
  //     setOrganization_logo('');
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
    inputField,
    input,
    buttonText,
    buttonContainer,
    haveAccountText,
    haveAccount,
    iconUser,
    scrollContainer,
    scrollContent,
    indicator,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar backgroundColor={'#B3CDE0'} barStyle={'dark-content'} />
      <ScrollView style={scrollContainer} 
        contentContainerStyle={scrollContent}
        showsVerticalScrollIndicator={false}
        >
        <View style={imageContainer}>
          <Image
            source={require('../../../assets/logo.png')}
            style={image}
          />
        </View>
        <View style={welcomeContainer}>
          <Text style={welcomeTitle}>Create Account</Text>
          <Text style={welcomeText}>
            Sign up as an organization to post your services
          </Text>
        </View>
        <View style={inputContainer}>
          <View style={input}>
            <Feather
              name={'mail'}
              size={20}
              color={'black'}
              style={iconUser}
            />
            <TextInput
              style={inputField}
              placeholder="Email"
              onChangeText={(value) => handleChange('email', value)}
              value={email}
            />
          </View>
          <View style={input}>
            <Feather
              name={'lock'}
              size={20}
              color={'black'}
              style={iconUser}
            />
            <TextInput
              style={inputField}
              placeholder="Password"
              secureTextEntry
              onChangeText={(value) => handleChange('password', value)}
              value={password}
            />
          </View>
          <View style={input}>
            <Octicons 
              name="organization" 
              size={20} 
              color="black"
              style={iconUser} 
              />
            <TextInput
              style={inputField}
              placeholder="Organization name"
              onChangeText={(value) => handleChange('organization_name', value)}
              value={organization_name}
            />
          </View>
          <View style={styles.imageContainer}>
            <Pressable style={styles.imageBtn} onPress={pickImage}>
              <Text style={styles.imageBtnText}>Choose Logo</Text>
            </Pressable>
            {organization_logo ? (
              <Image
                source={{ uri: organization_logo }}
                style={{ width: 100, height: 50 }}
              />
            ) : (
              <Text style={{ paddingLeft: SIZES.width * 0.03 }}>
                No file chosen
              </Text>
            )}
          </View>
        </View>
        <Button
          title={'Create Account'}
          buttonContainer={buttonContainer}
          buttonText={buttonText}
          press={()=>{
            navigation.navigate("OTP")
          }}
        />
        <Text style={styles.haveAccountText} onPress={()=>navigation.navigate("Login")}>
         Already have an account?
        </Text>
        {loading && <LoadingModal modalVisible={true} />} 
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3CDE0',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: SIZES.width * 0.7,
    height: SIZES.height * 0.25,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
  },
  welcomeText: {
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
    width: SIZES.width * 0.6,
  },
  inputContainer: {
    alignItems: 'center',
    paddingTop: SIZES.height * 0.01,
  },
  inputField: {
    width: SIZES.width * 0.64,
    padding: SIZES.height * 0.0007,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width * 0.8,
    padding: SIZES.height * 0.014,
    borderRadius: 10,
    margin: 7,
    backgroundColor: 'white',
    color: 'black',
    marginVertical: 10,
  },
  imageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: SIZES.height * 0.02,
  },
  imageBtn: {
    backgroundColor: '#6497B1',
    borderRadius: 3,
    padding: SIZES.height * 0.006,
  },
  imageBtnText: {
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    top: SIZES.height * 0.02,
  },
  buttonText: {
    color: 'black',
    backgroundColor: 'white',
    width: SIZES.width * 0.43,
    padding: SIZES.height * 0.017,
    textAlign: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  haveAccountText: {
    color: 'black',
    textAlign: 'center',
    paddingTop:SIZES.height*0.04
  },
  iconUser: {
    margin: 2,
    paddingRight: 5,
    color: '#9CADF2',
    borderColor: '#DBE3FF',
    borderRightWidth: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#B3CDE0',
    flexGrow: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.height * 0.1,
  },
  indicator: {
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    top: SIZES.height * 0.765,
    left: SIZES.width * 0.45,
  },
});

export default OrgRegister;
