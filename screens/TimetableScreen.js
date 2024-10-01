import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const mockTimetable = [
  { id: '1', time: '08:00', destination: 'Luanda' },
  { id: '2', time: '10:30', destination: 'Benguela' },
  { id: '3', time: '13:00', destination: 'Huambo' },
  { id: '4', time: '15:30', destination: 'Lubango' },
];

const TimetableScreen = ({ navigation, route }) => {
  const { company } = route.params;

  const renderItem = ({ item, index }) => (
    <Animatable.View animation="fadeInRight" delay={index * 100}>
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate('BookingInfo', { ride: item, company })}
      >
        <ListItem.Content>
          <ListItem.Title>{item.time}</ListItem.Title>
          <ListItem.Subtitle>{item.destination}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>{`Horários - ${company.name}`}</Text>
      <FlatList
        data={mockTimetable}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  },
});

export default TimetableScreen;