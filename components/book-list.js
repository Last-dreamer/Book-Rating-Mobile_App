import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

let token = null;
export default function BookList(props) {
  
  const [ books, setBooks ] = useState([]);
  
  
  const getData = async () => {
    token = await AsyncStorage.getItem('token')
    if(token){
      getBooks();
    } else {
      props.navigation.navigate("Auth");
    }
  }
  
   useEffect(() => {
     getData();
   });
   
   
   const getBooks = () => {  
    fetch(`http://10.0.2.2:8000/api/books/`,{
      method: 'GET',
      headers: {
              'Authorization': `Token ${token}`
               } 
  }).then(res => res.json())
  .then(r => setBooks(r))
  .catch(error => Console.log(error))
   }
   
   
   const bookClicked = (book) => {
     props.navigation.navigate('Detail', {book: book, title: book.title, token: token})
   }
  
  return (
    <View style={styles.container}>
     <Image source={require('../assets/BR_logo.png')}
           style={{paddingTop: 40, height:155, width: '100%',}}
           resizeMode='contain'/>
       
     <FlatList 
       data={books}
     
      renderItem = { ({item}) => (
        <TouchableOpacity onPress = {() => bookClicked(item)}>
           <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
           </TouchableOpacity>
       )}
      // we can use keyExtracter for keys to avoid duplications
       keyExtractor = {(item, index) => index.toString()}
     />
    
    </View>
  );
}

BookList.navigationOptions = screenProps => ({
 title: "Book Ratings", 
 headerStyle: {
   backgroundColor: '#282C35',
 },
 headerTintColor: '#fff',
 headerRight: (
   <Button color='#282C35' title='Add' onPress={() => screenProps.navigation.navigate('Edit', {book: {title: '', description: ''}, mToken: token})}/>
 ),
}); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    
  },
  item: {
    flex: 1,
    padding:10,
    height: 50,
    backgroundColor:'#282C35',
    borderTopColor: '#000',
    
  },
  itemText: {
    color: '#fff',
    fontSize: 24,
    borderLeftColor: 'orange',
    borderLeftWidth: 10,
    paddingLeft: 20
      
  }
});
