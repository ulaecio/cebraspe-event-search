import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import axios from 'axios';
import Header from '../Header';
import Button from '../Buton';

const Home = () => {
  const [events, setEvents] = useState([]);
  
  
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
      <Button />
      <SafeAreaView>
      <ScrollView >
      <View style={styles.view} >
        {events.length > 0 ? (
          events.map(event => (
            <View style={styles.containerItem} key={event.message.nomeEvento}>
              <Text>Nome:{event.message.nomeEvento}</Text>
              <Text style={styles.containerText}>Website: {event.message.webSite}</Text>
              <Text style={styles.containerText}>Data: {event.message.data}</Text>
              <Text style={styles.containerText}>
              Número máximo de candidatos: {event.message.numeroMaxCandidato}
              </Text>
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
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    view: {
    marginBottom: 250,
  },
  containerItem: {
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '2%',
    padding: 15,
    backgroundColor: '#FFF',
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
  containerImage: {
    width: 90,
    height: 90,
    marginTop: '1%',
    marginLeft: '35%',
    elevation: 5,
    alignItems: 'center',
    backgroundColor: '#ff7702',
    borderRadius: 10,
  },

});

export default Home;