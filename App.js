import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen.js";
import Products from "./screens/Products.js";
import Details from "./screens/ProductDetail.js";
import Blogs from "./screens/Blogs.js";
import BlogDetail from "./screens/BlogDetail.js";
import CustomHeader from "./components/CustomHeader.js";
import { CartProvider } from "./context/CartContext";
import CartScreen from "./screens/CartScreen.js";
import AboutHenk from "./screens/AboutHenkScreen.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} />,
          })}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Blog" component={Blogs} />
          <Stack.Screen name="BlogDetail" component={BlogDetail} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="AboutHenk" component={AboutHenk} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}