import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, CheckBox } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const paymentMethods = [
  { id: '1', name: 'Cartão de Crédito' },
  { id: '2', name: 'Transferência Bancária' },
  { id: '3', name: 'Pagamento Móvel' },
];

const PaymentScreen = ({ navigation, route }) => {
  const { bookingInfo, ride, company } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handlePayment = () => {
    if (selectedMethod) {
      navigation.navigate('Ticket', { bookingInfo, ride, company, paymentMethod: selectedMethod });
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDown" duration={1000}>
        <Text h4 style={styles.title}>Escolha o Método de Pagamento</Text>
        {paymentMethods.map((method) => (
          <CheckBox
            key={method.id}
            title={method.name}
            checked={selectedMethod === method.id}
            onPress={() => setSelectedMethod(method.id)}
            containerStyle={styles.checkboxContainer}
          />
        ))}
        <Button
          title="Pagar"
          onPress={handlePayment}
          disabled={!selectedMethod}
          buttonStyle={styles.payButton}
          containerStyle={styles.buttonContainer}
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
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#4CAF50',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default PaymentScreen;