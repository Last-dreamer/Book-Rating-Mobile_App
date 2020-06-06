import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity, Alert} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faStar } from '@fortawesome/free-solid-svg-icons';

export default function Detail(props) {
  
  const book =  props.navigation.getParam('book', null);
  const token =  props.navigation.getParam('token', '');
  const [highlight, setHighllighter] = useState(0);
  
  const starClicked = () => {
    if(highlight > 0 && highlight < 6 ){
      fetch(`http://10.0.2.2:8000/api/books/${book.id}/rateBook/`,{
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
                 },
        body: JSON.stringify({stars: highlight}) 
    }).then(res => res.json())
    .then(resp => {
          setHighllighter(0),
          Alert.alert('Rating', resp.message),
          updateBook()})
    .catch(error => Console.log(error));
    }
  }
  
  const updateBook = () => {
    fetch(`http://10.0.2.2:8000/api/books/${book.id}/`,{
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
                 }, 
    }).then(res => res.json())
    .then(resp => props.navigation.navigate('Detail', {book: resp, title: resp.title}));
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
      <FontAwesomeIcon style={book.avg_no_rating > 0 ? styles.orange: styles.white} icon={faStar} size={30}/>
      <FontAwesomeIcon style={book.avg_no_rating > 1 ? styles.orange: styles.white} icon={faStar} size={30}/>
      <FontAwesomeIcon style={book.avg_no_rating > 2 ? styles.orange: styles.white} icon={faStar} size={30}/>
      <FontAwesomeIcon style={book.avg_no_rating > 3 ? styles.orange: styles.white} icon={faStar} size={30}/>
      <FontAwesomeIcon style={book.avg_no_rating > 4 ? styles.orange: styles.white} icon={faStar} size={30}/>
      <Text style={styles.text}>({book.total_no_rating})</Text>
      </View>
      
         <Text style={styles.desc}>{book.description}</Text>
     
       <View style={{borderBottomColor: '#fff', borderBottomWidth: 3}}/>
       
       <Text style={styles.desc}>Rate it !!!</Text>
       <View style={styles.highlighter}>
         <FontAwesomeIcon style={highlight > 0 ? styles.orange: styles.white} icon={faStar} size={40} onPress= {() => setHighllighter(1)}/>
         <FontAwesomeIcon style={highlight > 1 ? styles.orange: styles.white} icon={faStar} size={40} onPress= {() => setHighllighter(2)}/>
         <FontAwesomeIcon style={highlight > 2 ? styles.orange: styles.white} icon={faStar} size={40} onPress= {() => setHighllighter(3)}/>
         <FontAwesomeIcon style={highlight > 3 ? styles.orange: styles.white} icon={faStar} size={40}  onPress= {() => setHighllighter(4)}/>
         <FontAwesomeIcon style={highlight > 4 ? styles.orange: styles.white} icon={faStar} size={40} onPress= {() => setHighllighter(5)}/>
      </View>
      <TouchableOpacity  onPress={() => starClicked()}>
        <Text style={styles.btn}>Rate It</Text>
      </TouchableOpacity>
       
     </View>
  );
     
}

// customizing top bar...
Detail.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
  headerStyle: {
    backgroundColor: 'orange',
  },
  
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft:50,
  },
  headerRight: (
    <Button title='Edit' color='orange'
     onPress = {() => screenProps.navigation.navigate('Edit', {book: screenProps.navigation.getParam('book'), title: screenProps.navigation.getParam('title'), token: screenProps.navigation.getParam('token')})}
    />
  ),
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35', 
  },
  text: {
    fontSize: 30,
    color: '#fff',
  },
  orange: {
    color: 'orange',
  },
  white: {
    color: 'white',
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: 30,
     paddingTop: 50,
     color: '#fff',
  },
  desc: {
    fontSize:24,
    color: "#fff",
    padding: 30, 
  },
  highlighter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: '#fff',
  },
  btn: {
    fontSize: 35,
    color: 'orange',
    alignItems:'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
    
  }
  
  
});
