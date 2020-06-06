import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Auth(props) {
  

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [regView, setRegView] = useState(false);

// we have use an empty array to check it once  
  useEffect(() => {
    getData();
  }, [])
  
  const mAuth = () => {
    if(regView){
      fetch(`http://10.0.2.2:8000/api/users/`,{
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                },
        body: JSON.stringify({username:username, password:password}) 
    }).then(res => res.json())
    .then(res => toggleView())
    .catch(error => Console.log(error));
    
    } else {
      
      fetch(`http://10.0.2.2:8000/auth/`,{
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                },
        body: JSON.stringify({username:username, password:password}) 
    }).then(res => res.json())
    .then(res => {
       saveData(res.token);
       props.navigation.navigate("BookList");
    } )
    .catch(error => Console.log(error));
    }
      
  } 
    

 const toggleView = () => {
   setRegView(!regView);
 }

 //it will save and store token ..
  const saveData = async (token) => {
    await AsyncStorage.setItem('token', token);
  }
  
  
  const getData = async () => {
   const token = await AsyncStorage.getItem('token');
   if(token)  props.navigation.navigate("BookList");
  
  }
  
 
  
  return (
    <View style={styles.container}> 
     <Text style={styles.login}>{regView ? 'Register': 'LogIn'}</Text>
      <Text style={styles.label}>Title</Text>
       <TextInput style={styles.input} placeholder = 'UserName' onChangeText={text => setUsername(text)}
         value={username} autoCapitalize={'none'}
       />
        <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} placeholder = 'Password' onChangeText={text => setPassword(text)}
        value={password} autoCapitalize={'none'} secureTextEntry={true}
       />
      
        <TouchableOpacity  onPress={() => mAuth()}>
      <Text style={styles.btn}>{regView ? 'Register' : "LogIn"}</Text>
        </TouchableOpacity>
     
     <TouchableOpacity onPress={() => setRegView(!regView)}>
    <Text style={styles.text}>{regView ? 'Already Having Account...':"Don't have any account !! Click here ...!!"}</Text>
      </TouchableOpacity>
     </View>
  );
     
}

// customizing top bar...
Auth.navigationOptions = screenProps => ({
  title: 'Login Page',
  headerStyle: {
    backgroundColor: 'orange'
  },
  
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft:50,
  },
  
  });



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35', 
  },
  label: {
    fontSize: 24,
    color: "#fff",
    padding: 10, 
  },
  input: {
      fontSize: 24,
      backgroundColor: '#fff',
      padding: 10,
      margin: 10,      
  },
  btn: {
    padding: 20,
    margin: 10,
    justifyContent: 'center',
    fontSize: 30,
    backgroundColor: 'orange',
    color:'#fff',
    textAlign: 'center'
    
  },
  login: {
      alignItems: 'center',
    justifyContent: 'center',
    fontSize: 60,
    color: 'orange',
    textAlign: 'center',
    padding:10,
    borderBottomWidth: 2,
    borderColor: '#fff',
  },
  text: {
    fontSize: 25,
    color: 'orange',
    padding: 20,
  },
  
});
