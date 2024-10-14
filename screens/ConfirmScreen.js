import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const ConfirmScreen = ({ navigation, route }) => {
  const { bookingInfo, ride, company } = route.params;
  
  const calculateTotal = () => {
    // Dummy calculation of total cost (e.g., 50 per passenger)
    return bookingInfo.length * 1;
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" duration={1000}>
        <Text h4 style={styles.title}>Proforma de Bilhetes</Text>
        <ScrollView style={styles.scrollContainer}>
          {bookingInfo.map((passenger, index) => (
            <View key={index} style={styles.passengerInfo}>
              <Text style={styles.textBold}>
                <Text>Passageiro {index + 1}</Text>
              </Text>
              <Text>
                <Text>Nome Completo: </Text>
                <Text>{passenger.nomeCompleto}</Text>
              </Text>
              <Text>
                <Text>Telefone: </Text>
                <Text>{passenger.telefone}</Text>
              </Text>
              <Text>
                <Text>Idade: </Text>
                <Text>{passenger.idade}</Text>
              </Text>
              <Text>
                <Text>Sexo: </Text>
                <Text>{passenger.sexo}</Text>
              </Text>
              <Text>
                <Text>Província: </Text>
                <Text>{passenger.provincia}</Text>
              </Text>
              <Text>
                <Text>Data de Viagem: </Text>
                <Text>{new Date(passenger.ano, passenger.mes, passenger.dia).toLocaleDateString()}</Text>
              </Text>
              <Text>
                <Text>Destino: </Text>
                <Text>{passenger.destino}</Text>
              </Text>
              <Text style={styles.textBold}>
                <Text>Preço: </Text>
                <Text>1 Kz</Text>
              </Text>
              <View style={styles.divider} />
            </View>
          ))}
        </ScrollView>
        
        <Text style={styles.totalText}>
          <Text>Total Passageiros: </Text>
          <Text>{bookingInfo.length}</Text>
        </Text>
        <Text style={styles.totalText}>
          <Text>Total: </Text>
          <Text>{calculateTotal()} Kz</Text>
        </Text>

        <Button
          title="Confirmar"
          onPress={() => navigation.navigate('Payment', { bookingInfo, ride, company })}
          buttonStyle={styles.confirmButton}
        />
        <Button
          title="Voltar"
          type="outline"
          onPress={() => navigation.goBack()}
          buttonStyle={styles.backButton}
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    maxHeight: 400,
    marginBottom: 20,
  },
  passengerInfo: {
    marginBottom: 10,
  },
  textBold: {
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: '#ff8e16',
    marginBottom: 10,
  },
  backButton: {
    borderColor: '#ff8e16',
  },
});

export default ConfirmScreen;