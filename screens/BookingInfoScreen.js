import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Picker } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

const provinces = [
  'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 'Cuanza Sul', 
  'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 
  'Namibe', 'Uíge', 'Zaire'
];

const BookingInfoScreen = ({ navigation, route }) => {
  const { ride, company } = route.params;
  
  const scrollViewRef = useRef(null); // To handle automatic sliding
  const [passengers, setPassengers] = useState([{
    nomeCompleto: '',
    telefone: '',
    idade: '',
    sexo: '',
    destino: ride.destination,
    provincia: '',
    data: new Date(),
  }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addPassenger = () => {
    setPassengers([...passengers, {
      nomeCompleto: '',
      telefone: '',
      idade: '',
      sexo: '',
      destino: ride.destination,
      provincia: '',
      data: new Date(),
    }]);
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 300); // Automatically slide to the new form
  };

  const handleInputChange = (field, value, index) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleDateChange = (event, selectedDate, index) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].data = selectedDate || updatedPassengers[index].data;
    setPassengers(updatedPassengers);
    setShowDatePicker(false);
  };

  const handleConfirm = () => {
    navigation.navigate('Payment', { bookingInfo: passengers, ride, company });
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" duration={1000}>
        <Text h4 style={styles.title}>Bilhetes</Text>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {passengers.map((passenger, index) => (
            <View key={index} style={styles.formContainer}>
              <Input
                placeholder="Nome Completo"
                value={passenger.nomeCompleto}
                onChangeText={(value) => handleInputChange('nomeCompleto', value, index)}
              />
              <Input
                placeholder="Nº Telefone / Whatsapp"
                value={passenger.telefone}
                onChangeText={(value) => handleInputChange('telefone', value, index)}
                keyboardType="phone-pad"
              />
              <Input
                placeholder="Idade"
                value={passenger.idade}
                onChangeText={(value) => handleInputChange('idade', value, index)}
                keyboardType="numeric"
              />
              <Picker
                selectedValue={passenger.sexo}
                onValueChange={(value) => handleInputChange('sexo', value, index)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione o sexo" value="" />
                <Picker.Item label="Masculino" value="Masculino" />
                <Picker.Item label="Feminino" value="Feminino" />
              </Picker>
              <Picker
                selectedValue={passenger.provincia}
                onValueChange={(value) => handleInputChange('provincia', value, index)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione a província" value="" />
                {provinces.map((provincia) => (
                  <Picker.Item key={provincia} label={provincia} value={provincia} />
                ))}
              </Picker>
              <Button
                title={passenger.data.toLocaleDateString()}
                onPress={() => setShowDatePicker(true)}
                buttonStyle={styles.dateButton}
                titleStyle={styles.dateTitle}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={passenger.data}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => handleDateChange(event, selectedDate, index)}
                />
              )}
            </View>
          ))}
        </ScrollView>

        <View style={styles.passengerCounter}>
          <Text>{`${passengers.length} Passageiro(s)`}</Text>
        </View>

        <Button
          title="Adicionar Passageiro"
          onPress={addPassenger}
          buttonStyle={styles.addButton}
          type="outline"
        />

<Button
  title="Confirmar"
  onPress={() => navigation.navigate('Confirm', { bookingInfo: passengers, ride, company })} // Navigate to ConfirmScreen
  buttonStyle={styles.confirmButton}
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
  formContainer: {
    width: 300,
    paddingHorizontal: 10,
  },
  picker: {
    marginVertical: 10,
    height: 50,
  },
  dateButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
    marginVertical: 20,
  },
  dateTitle: {
    color: '#2196F3',
  },
  addButton: {
    borderColor: '#4CAF50',
    borderWidth: 1,
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  buttonContainer: {
    marginTop: 20,
  },
  passengerCounter: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default BookingInfoScreen;
