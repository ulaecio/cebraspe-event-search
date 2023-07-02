import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
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
      <Header />
      <button style={styles.button}><Text style={styles.buttonText} onPress={handleOnPress}>Cadastrar</Text></button>
      <View >
        {events.length > 0 ? (
          events.map(event => (
            <View style={styles.containerItem} key={event.message.nomeEvento}>
              <View style={styles.containerTextHeader}>Nome:<Text>{event.message.nomeEvento}</Text></View>
              <Text style={styles.containerText}>Website: {event.message.webSite}</Text>
              <Text style={styles.containerText}>Data: {event.message.data}</Text>
              <Text style={styles.containerText}>Número máximo de candidatos: {event.message.numeroMaxCandidato}</Text>
              <View >
                <Text style={styles.containerText}>Endereço:
                  Rua: {JSON.stringify(event.message.endereco.logradouro)},
                  Bairro: {JSON.stringify(event.message.endereco.bairro)},
                  Cidade: {JSON.stringify(event.message.endereco.cidade)},
                  Complemento: {JSON.stringify(event.message.endereco.complemento)},
                  Nº: {JSON.stringify(event.message.endereco.numero)},
                  UF: {JSON.stringify(event.message.endereco.uf)},
                  CEP: {JSON.stringify(event.message.endereco.cep)}
                </Text>
              </View>
              <Image source={(event.message.imageUrl)} style={styles.containerImage} />
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  containerImage: {
    width: 100,
    height: 100,
    marginTop: '10%',
    marginLeft: '28%',
    marginRight: '10%',
    marginBottom: '10%',
    padding: 15,
    backgroundColor: '#DA5C5C',
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center'
  },

  containerTextHeader: {
    textTransform: 'uppercase',
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '2%',
    padding: 15,
    backgroundColor: '#FFF',
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowRadius: 0
  },

  containerItem: {
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '2%',
    padding: 15,
    backgroundColor: '#FFF',
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    borderRadius: 10,
    elevation: 5,
  },

  containerText: {
    marginTop: '1%',
    marginLeft: '1%',
    marginRight: '1%',
    marginBottom: '1%',
    padding: 15,
    backgroundColor: '#FFF',
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    borderRadius: 10,
    elevation: 5,
    fontSize: 14,
    fontWeight: '400',
  },

  container: {
    paddingRight: '5%',
    paddingLeft: '5%',
    backgroundColor: '#F5F5F5'
  },
  button: {
    backgroundColor: '#DA5C5C',
    flexDirection: 'row',
    borderRadius: 20,
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
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

export default Home;
