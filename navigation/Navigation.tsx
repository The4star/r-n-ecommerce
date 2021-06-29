import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/ui/HeaderButton';
import ProductsOverview from '../screens/shop/products-overview/ProductsOverview';
import ProductDetails from '../screens/shop/product-details/ProductDetails';
import colors from '../constants/colors';
import {
  AdminParamList,
  AuthParamList,
  OrdersParamList,
  ProductParamList,
  ShopDrawerParamList
} from '../types/navigation.types';
import { RouteProp } from '@react-navigation/native';
import Cart from '../screens/shop/cart/Cart';
import Orders from '../screens/shop/orders/Orders';
import { Ionicons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import UserProducts from '../screens/user/user-products/UserProducts';
import EditProduct from '../screens/user/edit-product/EditProduct';
import Authentication from '../screens/user/authentication/Authentication';


const ProductStack = createStackNavigator<ProductParamList>();
const ordersStack = createStackNavigator<OrdersParamList>();
const adminStack = createStackNavigator<AdminParamList>();
const AuthStack = createStackNavigator<AuthParamList>();
const ShopDrawer = createDrawerNavigator<ShopDrawerParamList>();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  }
}

const ProductsNavigator = () => (
  <ProductStack.Navigator screenOptions={defaultScreenOptions}>
    <ProductStack.Screen
      name="Products"
      component={ProductsOverview}
      options={({ navigation }: { navigation: DrawerNavigationProp<ProductParamList, 'Products'> }) => {
        return {
          headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Cart"
              iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              onPress={() => navigation.navigate({
                name: 'Cart',
                params: undefined
              })}
            />
          </HeaderButtons>,
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title="Drawer" iconName='ios-menu' onPress={() => {
                navigation.toggleDrawer();
              }} />
            </HeaderButtons>
          ),
          headerTitle: "All Products"
        }
      }}
    />
    <ProductStack.Screen
      name="ProductDetails"
      component={ProductDetails}
      options={({ route }: { route: RouteProp<ProductParamList, 'ProductDetails'> }) => {
        return {
          headerTitle: route.params.productTitle!
        }
      }}
    />
    <ProductStack.Screen
      name="Cart"
      component={Cart}
    />
  </ProductStack.Navigator >
)

const OrdersNavigator = () => (
  <ordersStack.Navigator screenOptions={defaultScreenOptions}>
    <ordersStack.Screen
      name="Orders"
      component={Orders}
      options={({ navigation }: { navigation: DrawerNavigationProp<OrdersParamList, "Orders"> }) => {
        return {
          headerTitle: "Your Orders",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title="Drawer" iconName='ios-menu' onPress={() => {
                navigation.toggleDrawer();
              }} />
            </HeaderButtons>
          ),
        }
      }}
    />
  </ordersStack.Navigator>
)

const AdminNavigator = () => (
  <adminStack.Navigator screenOptions={defaultScreenOptions}>
    <adminStack.Screen
      name="UserProducts"
      component={UserProducts}
      options={({ navigation }: { navigation: DrawerNavigationProp<AdminParamList, "UserProducts"> }) => {
        return {
          headerTitle: "Your Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title="Drawer" iconName='ios-menu' onPress={() => {
                navigation.toggleDrawer();
              }} />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title="Create" iconName='ios-create' onPress={() => {
                navigation.navigate({
                  name: 'EditProduct',
                  params: {}
                })
              }} />
            </HeaderButtons>
          ),
        }
      }}
    />
    <adminStack.Screen
      name="EditProduct"
      component={EditProduct}
      options={({ navigation, route }: { navigation: DrawerNavigationProp<AdminParamList, 'EditProduct'>, route: RouteProp<AdminParamList, 'EditProduct'> }) => {
        return {
          headerTitle: route.params.productTitle ? route.params.productTitle : "Add Product",
        }
      }}
    />
  </adminStack.Navigator>
)

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={defaultScreenOptions}>
    <AuthStack.Screen
      name="Authentication"
      component={Authentication}
    />
  </AuthStack.Navigator>
)

const ShopNavigator = () => (
  <ShopDrawer.Navigator drawerContentOptions={{ activeTintColor: Colors.primary }} >
    <ShopDrawer.Screen
      name="ProductNav"
      component={ProductsNavigator}
      options={{
        drawerLabel: "Products",
        drawerIcon: drawerConfig => <Ionicons name="ios-cart" size={23} color={drawerConfig.color} />
      }}
    />
    <ShopDrawer.Screen
      name="OrderNav"
      component={OrdersNavigator}
      options={{
        drawerLabel: "Orders",
        drawerIcon: drawerConfig => <Ionicons name="ios-list" size={23} color={drawerConfig.color} />
      }}
    />
    <ShopDrawer.Screen
      name="AdminNav"
      component={AdminNavigator}
      options={{
        drawerLabel: "Admin",
        drawerIcon: drawerConfig => <Ionicons name="pencil" size={23} color={drawerConfig.color} />
      }}
    />
  </ShopDrawer.Navigator>
)

export {
  AuthNavigator,
  ShopNavigator
} 