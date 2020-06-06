import React from 'react';
import BookList  from './components/book-list';
import Detail from './components/detail';
import Edit from './components/edit';
import Auth from './components/auth';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from  'react-navigation-stack';


const AppNavigateor = createStackNavigator({
  Auth: {screen: Auth},
  BookList: {screen: BookList},
  Detail: {screen: Detail},
  Edit: {screen: Edit}
});

const App = createAppContainer(AppNavigateor);
export default App;
