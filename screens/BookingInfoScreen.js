import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';
import { 
  RadioButton, 
  TextInput, 
  IconButton, 
  Provider as PaperProvider, 
  DefaultTheme 
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const provinces = [
  'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 'Cuanza Sul', 
  'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 
  'Namibe', 'Uíge', 'Zaire'
];

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff8e16',
    accent: '#ff8e16',
  },
};

const BookingInfoScreen = ({ navigation, route }) => {
  const { ride, company } = route.params;
  
  const scrollViewRef = useRef(null);
  const [passengers, setPassengers] = useState([{
    nomeCompleto: '',
    telefone: '',
    idade: '',
    sexo: '',
    destino: ride.destination,
    provincia: '',
    data: new Date(),
  }]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerIndex, setDatePickerIndex] = useState(0);

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
    }, 300);
  };

  const removePassenger = (index) => {
    if (passengers.length > 1) {
      setPassengers(prevPassengers => {
        const updatedPassengers = [...prevPassengers];
        updatedPassengers.splice(index, 1);
        return updatedPassengers;
      });
      
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: -500, animated: true });
        }
      }, 300);
    }
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

  return (
    <PaperProvider theme={theme}>
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
                <TextInput
                  label="Nome Completo"
                  value={passenger.nomeCompleto}
                  onChangeText={(value) => handleInputChange('nomeCompleto', value, index)}
                  style={styles.input}
                  theme={theme}
                />
                <TextInput
                  label="Nº Telefone / Whatsapp"
                  value={passenger.telefone}
                  onChangeText={(value) => handleInputChange('telefone', value, index)}
                  keyboardType="phone-pad"
                  style={styles.input}
                  theme={theme}
                />
                <TextInput
                  label="Idade"
                  value={passenger.idade}
                  onChangeText={(value) => handleInputChange('idade', value, index)}
                  keyboardType="numeric"
                  style={styles.input}
                  theme={theme}
                />
                <View style={styles.radioContainer}>
                  <Text>Selecione o sexo:</Text>
                  <RadioButton.Group
                    onValueChange={(value) => handleInputChange('sexo', value, index)}
                    value={passenger.sexo}
                  >
                    <View style={styles.radioGroup}>
                      <View style={styles.radioItem}>
                        <RadioButton value="Masculino" color="#ff8e16" />
                        <Text>Masculino</Text>
                      </View>
                      <View style={styles.radioItem}>
                        <RadioButton value="Feminino" color="#ff8e16" />
                        <Text>Feminino</Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={styles.pickerContainer}>
                  <Text style={styles.pickerLabel}>Destino</Text>
                  <Picker
                    selectedValue={passenger.provincia}
                    onValueChange={(value) => handleInputChange('provincia', value, index)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecione o destino" value="" />
                    {provinces.map((provincia) => (
                      <Picker.Item key={provincia} label={provincia} value={provincia} />
                    ))}
                  </Picker>
                </View>
                <View style={styles.datePickerContainer}>
                  <Text style={styles.datePickerLabel}>Data de Partida</Text>
                  <Button
                    title={passenger.data.toLocaleDateString()}
                    onPress={() => {
                      setShowDatePicker(true);
                      setDatePickerIndex(index);
                    }}
                    buttonStyle={styles.dateButton}
                    titleStyle={styles.dateTitle}
                  />
                </View>
                {showDatePicker && datePickerIndex === index && (
                  <DateTimePicker
                    value={passenger.data}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => handleDateChange(event, selectedDate, index)}
                  />
                )}
                <IconButton
                  icon="delete"
                  color="#FF0000"
                  size={24}
                  onPress={() => removePassenger(index)}
                  style={styles.deleteButton}
                />
              </View>
            ))}
          </ScrollView>

          <View style={styles.passengerCounter}>
            <Text>{`${passengers.length} Passageiro(s)`}</Text>
          </View>

          <Button
            title="Adicionar Passageiro"
            onPress={addPassenger}
            buttonStyle={[styles.addButton, { borderColor: '#ff8e16' }]}
            titleStyle={{ color: '#ff8e16' }}
            type="outline"
          />

          <Button
            title="Confirmar"
            onPress={() => navigation.navigate('Confirm', { bookingInfo: passengers, ride, company })}
            buttonStyle={styles.confirmButton}
            containerStyle={styles.buttonContainer}
          />
        </Animatable.View>
      </View>
    </PaperProvider>
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
    width:350,
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 10,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 12,
    color: '#ff8e16',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ff8e16',
    borderRadius: 5,
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  datePickerLabel: {
    fontSize: 12,
    color: '#ff8e16',
    marginBottom: 5,
  },
  dateButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff8e16',
    borderRadius: 5,
  },
  dateTitle: {
    color: '#ff8e16',
  },
  addButton: {
    borderColor: '#ff8e16',
    borderWidth: 1,
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: '#ff8e16',
  },
  buttonContainer: {
    marginTop: 20,
  },
  radioContainer: {
    marginVertical: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerCounter: {
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});

export default BookingInfoScreen;