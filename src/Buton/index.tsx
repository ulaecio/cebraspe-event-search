import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Buton = () => {
  const [events, setEvents] = useState([]);
  
  const navigation = useNavigation();
  
  const handleOnPress = () => {
    navigation.navigate('Form');
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://extranet.cebraspe.org.br/AvaliacaoCSA/BackEnd/'
        );
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <View
      style={styles.view}><Text style={styles.viewText} onPress={handleOnPress}>Cadastrar</Text></
      View >
    </>
  );
};

const styles = StyleSheet.create({

  view: {
    backgroundColor: '#ff7702',
    flexDirection: 'row',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    letterSpacing: -0.24,
    fontFamily: 'OpenSans_700Bold'
  }
});

export default Buton;