import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const TicketScreen = ({ route }) => {
  const { bookingInfo, ride, company, paymentMethod } = route.params;

  return (
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" duration={1000}>
        <Card containerStyle={styles.card}>
          <Card.Title h3>Bilhete de Viagem</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>Empresa: {company.name}</Text>
          <Text style={styles.text}>Destino: {ride.destination}</Text>
          <Text style={styles.text}>Hora de Partida: {ride.time}</Text>
          <Text style={styles.text}>Data: {bookingInfo.date.toLocaleDateString()}</Text>
          <Text style={styles.text}>Nome: {bookingInfo.name}</Text>
          <Text style={styles.text}>ID: {bookingInfo.idNumber}</Text>
          <Text style={styles.text}>Passageiros: {bookingInfo.passengers}</Text>
          <Text style={styles.text}>Método de Pagamento: {paymentMethod}</Text>
        </Card>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TicketScreen;