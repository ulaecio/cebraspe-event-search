import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Header from '../Header';

const Form = () => {
  const [apiResponse, setApiResponse] = useState('');
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    nomeEvento: '',
    webSite: '',
    data: '',
    numeroMaxCandidato: 0,
    endereco: {
      logradouro: '',
      bairro: '',
      cidade: '',
      complemento: '',
      numero: '',
      uf: '',
      cep: '',
    },
    imageUrl: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const fetchAddressDetails = () => {
    const cep = formData.endereco.cep;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          setFormData(prevState => ({
            ...prevState,
            endereco: {
              ...prevState.endereco,
              logradouro: data.logradouro,
              numero: data.numero,
              bairro: data.bairro,
              cidade: data.localidade,
              complemento: data.complemento,
              uf: data.uf,
            },
          }));
        } else {
          Alert.alert('Error', 'CEP não encontrado');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Falha ao buscar os detalhes do endereço');
      });
  };

  const handleSubmit = () => {
    // Validar entradas de formulário
    if (formData.nomeEvento === '') {
      Alert.alert('Error', 'Insira um nome de evento válido');
      return;
    }
    if (formData.webSite === '') {
      Alert.alert('Error', 'Insira um site válido');
      return;
    }

    fetch('https://extranet.cebraspe.org.br/AvaliacaoCSA/BackEnd/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
      setApiResponse(data.message[0]);
      Alert.alert('Success', apiResponse);
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Error', 'Falha ao enviar dados');
    });
  };

  return (
    <>
    <Header />
    <View>
    <Text>{apiResponse}</Text>
      <Text style={styles.header}>Nome do Evento:</Text>
        <TextInput style={styles.input}
        placeholder="Digite o nome do evento"
        value={formData.nomeEvento}
        onChangeText={value => handleInputChange('nomeEvento', value)}
      />
        <Text style={styles.header}>Website:</Text>
        <TextInput
          style={styles.input}
        placeholder="Digite o website"
        value={formData.webSite}
        onChangeText={value => handleInputChange('webSite', value)}
      />
        <Text style={styles.header}>Data:</Text>
        <TextInput
          style={styles.input}
        placeholder="Formato 2023-08-05T14:35:01.3874111-03:00"
        value={formData.data}
        onChangeText={value => handleInputChange('data', value)}
      />
        <Text style={styles.header}>Número máximo de candidato:</Text>
        <TextInput
          style={styles.input}
        placeholder="Digite o número máximo de candidato"
        value={formData.numeroMaxCandidato.toString()}
        onChangeText={value => handleInputChange('numeroMaxCandidato', Number(value))}
        keyboardType="numeric"
      />
        <Text style={styles.header}>CEP:</Text>
        <TextInput
          style={styles.input}
        placeholder="Digite o CEP"
        value={formData.endereco.cep}
        onChangeText={value => handleInputChange('endereco', { ...formData.endereco, cep: value })}
        keyboardType="numeric"
        onBlur={fetchAddressDetails}
      />
        <Text style={styles.header}>Logradouro:</Text>
        <TextInput
          style={styles.input}
        placeholder="Digite o logradouro"
        value={formData.endereco.logradouro}
        onChangeText={value => handleInputChange('endereco', { ...formData.endereco, logradouro: value })}
        editable={false}
      />
        <Text style={styles.header}>Numero:</Text>
        <TextInput
          style={styles.input}
        placeholder="Digite o numero"
        value={formData.endereco.numero}
        onChangeText={value => handleInputChange('endereco', { ...formData.endereco, numero: value })}
        editable={true}
      />
        <Text style={styles.header}>Bairro:</Text>
        <TextInput
          style={styles.input}
        placeholder="Digite o bairro"
        value={formData.endereco.bairro}
        onChangeText={value => handleInputChange('endereco', { ...formData.endereco, bairro: value })}
        editable={false}
      />
        <Text style={styles.header}>Cidade:</Text>
        <TextInput
          style={styles.input}
        placeholder="Digite a cidade"
        value={formData.endereco.cidade}
        onChangeText={value => handleInputChange('endereco', { ...formData.endereco, cidade: value })}
        editable={false}
      />
        <Text style={styles.header}>Complemento:</Text>
        <TextInput
          style={styles.input}
        placeholder="Digite o complemento"
        value={formData.endereco.complemento}
        onChangeText={value => handleInputChange('endereco', { ...formData.endereco, complemento: value })}
        editable={true}
      />
        <Text style={styles.header}>UF:</Text>
        <TextInput
          style={styles.input}
        placeholder="Digite a UF"
        value={formData.endereco.uf}
        onChangeText={value => handleInputChange('endereco', { ...formData.endereco, uf: value })}
        editable={false}
      />
      <Text style={styles.header}>URL da imagem:</Text>
      <TextInput
      style={styles.input}
        value={formData.imageUrl}
        placeholder="Digite a URL da imagem"
        onChangeText={value => handleInputChange('imageUrl', value)}
        />
      
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  header: {
    height: 5,
    margin: 12,
    padding: 5,
  },
});

export default Form;
