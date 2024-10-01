import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

const BookingInfoScreen = ({ navigation, route }) => {
  const { ride, company } = route.params;
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [passengers, setPassengers] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleConfirm = () => {
    navigation.navigate('Payment', { bookingInfo: { name, idNumber, passengers, date }, ride, company });
  };

  return (
    <ScrollView style={styles.container}>
      <Animatable.View animation="fadeInUp" duration={1000}>
        <Text h4 style={styles.title}>Informações de Reserva</Text>
        <Input
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder="Número de Identificação"
          value={idNumber}
          onChangeText={setIdNumber}
        />
        <Input
          placeholder="Número de Passageiros"
          value={passengers}
          onChangeText={setPassengers}
          keyboardType="numeric"
        />
        <Button
          title={date.toLocaleDateString()}
          onPress={() => setShowDatePicker(true)}
          buttonStyle={styles.dateButton}
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
        <Button
          title="Confirmar"
          onPress={handleConfirm}
          buttonStyle={styles.confirmButton}
          containerStyle={styles.buttonContainer}
        />
      </Animatable.View>
    </ScrollView>
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
  dateButton: {
    backgroundColor: '#2196F3',
    marginVertical: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default BookingInfoScreen;