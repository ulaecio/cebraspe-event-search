import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function Header() {

  return (
      <View style={styles.container}>
        <Text style={styles.text}>CEBRASPE EVENTS SEARCH</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#DA5C5C',
      height: 90,
      width: 360,
      paddingTop: 25,
      padding: 0,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    text: {
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 25,
      letterSpacing: -0.24,
      color: '#FFF',
      marginLeft: 15,
      fontFamily: 'OpenSans_700Bold'
    }
  });
export default Header;