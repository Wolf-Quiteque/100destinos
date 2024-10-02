import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Text, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const mockTimetable = [
  { id: '1', time: '08:00', destination: 'Luanda', price: '2500 Kz' },
  { id: '2', time: '10:30', destination: 'Benguela', price: '4000 Kz' },
  { id: '3', time: '13:00', destination: 'Huambo', price: '5000 Kz' },
  { id: '4', time: '15:30', destination: 'Lubango', price: '7000 Kz' },
];

const TimetableScreen = ({ navigation }) => {
  const [selectedStartingPoint, setSelectedStartingPoint] = useState(null);

  const startingPoints = ['GAMEK', 'CACUACO', 'VIANA'];

  const renderTimetableItem = ({ item, index }) => (
    <Animatable.View animation="fadeInRight" delay={index * 100}>
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate('BookingInfo', { ride: item })}
      >
        <ListItem.Content>
          <ListItem.Title style={styles.time}>{item.time}</ListItem.Title>
          <ListItem.Subtitle style={styles.destination}>
            {item.destination}
          </ListItem.Subtitle>
          <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {!selectedStartingPoint ? (
        <>
          <Text h4 style={styles.title}>Ponto de Partida</Text>
          <View style={styles.buttonsContainer}>
            {startingPoints.map((point) => (
              <Button
                key={point}
                title={point}
                buttonStyle={styles.startingPointButton}
                onPress={() => setSelectedStartingPoint(point)}
              />
            ))}
          </View>
        </>
      ) : (
        <>
          <Text h4 style={styles.title}>Horários - {selectedStartingPoint}</Text>
          <FlatList
            data={mockTimetable}
            renderItem={renderTimetableItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  startingPointButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  time: {
    fontSize: 18,
    color: '#333',
  },
  destination: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
});

export default TimetableScreen;
