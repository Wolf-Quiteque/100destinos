import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';

const mockTabelaHorarios = {
  GAMEK: [
    { id: '1', hora: '08:00', destino: 'Luanda', preco: '2500 Kz' },
    { id: '2', hora: '10:30', destino: 'Benguela', preco: '4000 Kz' },
    { id: '3', hora: '13:00', destino: 'Huambo', preco: '5000 Kz' },
  ],
  CACUACO: [
    { id: '1', hora: '09:00', destino: 'Luanda', preco: '2000 Kz' },
    { id: '2', hora: '11:30', destino: 'Benguela', preco: '3500 Kz' },
    { id: '3', hora: '14:00', destino: 'Lubango', preco: '6000 Kz' },
  ],
  VIANA: [
    { id: '1', hora: '07:30', destino: 'Luanda', preco: '1800 Kz' },
    { id: '2', hora: '12:00', destino: 'Huambo', preco: '4500 Kz' },
    { id: '3', hora: '15:30', destino: 'Benguela', preco: '3800 Kz' },
  ],
};

const TimetableScreen = ({ navigation }) => {
  const [pontoPartidaSelecionado, setPontoPartidaSelecionado] = useState('GAMEK');

  const pontosPartida = ['GAMEK', 'CACUACO', 'VIANA'];

  const renderItemHorario = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemHorario}
      onPress={() => navigation.navigate('BookingInfo', { ride: item })}
    >
      <Text style={styles.hora}>{item.hora}</Text>
      <Text style={styles.destino}>{item.destino}</Text>
      <Text style={styles.preco}>{item.preco}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text h4 style={styles.titulo}>Ponto de Partida</Text>
      <View style={styles.containerBotoes}>
        {pontosPartida.map((ponto) => (
          <Button
            key={ponto}
            title={ponto}
            buttonStyle={[
              styles.botaoPontoPartida,
              pontoPartidaSelecionado === ponto && styles.botaoSelecionado
            ]}
            titleStyle={[
              styles.textoBotao,
              pontoPartidaSelecionado === ponto && styles.textoBotaoSelecionado
            ]}
            onPress={() => setPontoPartidaSelecionado(ponto)}
          />
        ))}
      </View>
      <Text h4 style={styles.titulo}>Horários - {pontoPartidaSelecionado}</Text>
      <View style={styles.cabecalhoTabela}>
        <Text style={styles.textoCabecalho}>Hora</Text>
        <Text style={styles.textoCabecalho}>Destino</Text>
        <Text style={styles.textoCabecalho}>Preço</Text>
      </View>
      <FlatList
        data={mockTabelaHorarios[pontoPartidaSelecionado]}
        renderItem={renderItemHorario}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 10,
  },
  titulo: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 22,
    color: '#333',
  },
  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  botaoPontoPartida: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  botaoSelecionado: {
    backgroundColor: '#2E7D32',
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 14,
  },
  textoBotaoSelecionado: {
    fontWeight: 'bold',
  },
  cabecalhoTabela: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E0E0E0',
    marginBottom: 5,
  },
  textoCabecalho: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  itemHorario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  hora: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  destino: {
    flex: 2,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  preco: {
    flex: 1,
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'right',
  },
});

export default TimetableScreen;