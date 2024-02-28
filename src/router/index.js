import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Flash from '../pages/Flash';
import Register from '../pages/Register';
import MyTabBar from '../component/myTabBar';
import MyRecipe from '../pages/MyRecipe';
import EditProfile from '../pages/EditProfile';
import EditProfilPicture from '../pages/EditProfilePicture';
import AddRecipe from '../pages/AddRecipe';
import EditRecipe from '../pages/EditRecipe';
import { useState } from 'react';
import DetailRecipe from '../pages/DetailRecipe';
const MainTab = () => {
  const Tab = createBottomTabNavigator();
  const [page, setPage] = useState(1)
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home">
        {() => <Home page={page} pageSize={10} setPage={setPage}/>}
      </Tab.Screen>
      <Tab.Screen name="AddRecipe" component={AddRecipe} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const MainRoute = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Flash" component={Flash} />
        <Stack.Screen name="MyRecipe" component={MyRecipe} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="EditProfilePicture" component={EditProfilPicture} />
        <Stack.Screen name="EditRecipe" component={EditRecipe} />
        <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;
