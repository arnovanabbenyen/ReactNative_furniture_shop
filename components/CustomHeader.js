import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CartContext } from '../context/CartContext.js';

export default function CustomHeader({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const translateAnim = useState(new Animated.Value(-200))[0];
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateAnim, {
        toValue: -300,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setMenuOpen(false));
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/henk_logo.jpg')} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <View style={styles.cart_div}>
              <Icon name="shopping-cart" size={18} color="#000" style={styles.icon_cart} />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu}>
            <Icon name="menu" size={32} color="#333" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      {menuOpen && (
        <Animated.View style={[styles.menu, { transform: [{ translateY: translateAnim }] }]}>
          <View style={styles.menuInner}>
            <TouchableOpacity onPress={() => { toggleMenu(); navigation.navigate('Products'); }}>
              <Text style={styles.menuItem}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { toggleMenu(); navigation.navigate('Blog'); }}>
              <Text style={styles.menuItem}>Blogs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { toggleMenu(); navigation.navigate('AboutHenk'); }}>
              <Text style={styles.menuItem}>Over Henk</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  logo: {
    width: 120,
    height: 30,
    resizeMode: 'contain',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cart_div: {
    position: 'relative',
    marginRight: 16,
  },
  icon_cart: {
    marginRight: 8,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -10,
    backgroundColor: '#000000',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menu: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  menuInner: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 0,
    borderBottomWidth: 3,
    marginTop: 32,
    borderColor: '#333',
  },
});
