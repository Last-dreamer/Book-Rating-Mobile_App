import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput,AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Edit(props) {
  
  const book =  props.navigation.getParam('book', null);
  const token =  props.navigation.getParam('token', '');
  const [title, setTitle] = useState(book.title);
  const [desc, setDesc] = useState(book.description);

 // updating the content  using  PUT method 
  const saveMovie = () => {
    
    if(book.id){
      
      fetch(`http://10.0.2.2:8000/api/books/${book.id}/`,{
        method: 'PUT',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
                 },
        body: JSON.stringify({title:title, description: desc}) 
    }).then(res => res.json())
    .then(book => {props.navigation.navigate('Detail', {book: book, title: book.title})} )
    .catch(error => Console.log(error));
    props.navigation.goBack();
    
  }else {
    const mtoken =  props.navigation.getParam('mToken', '');
    console.log(mtoken);
    fetch(`http://10.0.2.2:8000/api/books/`,{
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${mtoken}`
                 },
        body: JSON.stringify({title:title, description: desc}) 
    }).then(res => res.json())
    .then(res => { console.log('i done know'+token);
                  props.navigation.navigate('BookList')} )
    .catch(error => Console.log(error));
  }

  } 
  
 
  
  return (
    <View style={styles.container}> 
      <Text style={styles.label}>Title</Text>
       <TextInput style={styles.input} placeholder = 'title' onChangeText={text => setTitle(text)}
         value={title}
       />
        <Text style={styles.label}>{book.description}</Text>
      <TextInput style={styles.input} placeholder = 'description' onChangeText={text => setDesc(text)}
        value={desc}
       />
      
        <TouchableOpacity  onPress={() => saveMovie()}>
            
            <Text style={styles.btn}> {book.id ? 'Update': 'Add'}</Text>
        </TouchableOpacity>
     
      
     </View>
  );
     
}

// customizing top bar...
Edit.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
  headerStyle: {
    backgroundColor: 'orange'
  },
  
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft:50,
  },
  headerRight: (
    <Button color="orange" title="remove" onPress={() => removeClicked(screenProps)}/>
  ),
  });

const removeClicked = (props) => {
  const book = props.navigation.getParam('book');
  const token = props.navigation.getParam('token');
  fetch(`http://10.0.2.2:8000/api/books/${book.id}/`,{
    method: 'DELETE',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
             } 
}).then(res => { props.navigation.navigate('BookList')} )
.catch(error => Console.log(error));
}

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
    
  }
  
});
