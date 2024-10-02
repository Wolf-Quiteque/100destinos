import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const ConfirmScreen = ({ navigation, route }) => {
  const { bookingInfo, ride, company } = route.params;
  
  const calculateTotal = () => {
    // Dummy calculation of total cost (e.g., 50 per passenger)
    return bookingInfo.length * 50;
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" duration={1000}>
        <Text h4 style={styles.title}>Proforma de Bilhetes</Text>
        <ScrollView style={styles.scrollContainer}>
          {bookingInfo.map((passenger, index) => (
            <View key={index} style={styles.passengerInfo}>
              <Text style={styles.textBold}>Passageiro {index + 1}</Text>
              <Text>Nome Completo: {passenger.nomeCompleto}</Text>
              <Text>Telefone: {passenger.telefone}</Text>
              <Text>Idade: {passenger.idade}</Text>
              <Text>Sexo: {passenger.sexo}</Text>
              <Text>Província: {passenger.provincia}</Text>
              <Text>Data de Viagem: {passenger.data.toLocaleDateString()}</Text>
              <Text>Destino: {passenger.destino}</Text>
              <Text style={styles.textBold}>Preço: 50 Kz</Text> {/* Dummy price */}
              <View style={styles.divider} />
            </View>
          ))}
        </ScrollView>
        
        <Text style={styles.totalText}>Total Passageiros: {bookingInfo.length}</Text>
        <Text style={styles.totalText}>Total: {calculateTotal()} Kz</Text>

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
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
  backButton: {
    borderColor: '#4CAF50',
  },
});

export default ConfirmScreen;
