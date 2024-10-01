import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Image } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const companies = [
  { id: '1', name: 'Macon' },
  { id: '2', name: 'Humabo Express' },
  { id: '3', name: 'REAL Express' },
];

const CompanyListScreen = ({ navigation }) => {
  const renderItem = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" delay={index * 200}>
      <Button
        title={item.name}
        onPress={() => navigation.navigate('Timetable', { company: item })}
        buttonStyle={styles.companyButton}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
        icon={
          <Image
            source={{ uri: `https://picsum.photos/seed/${item.id}/200` }}
            style={styles.companyImage}
          />
        }
        iconPosition="top"
      />
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={companies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  listContainer: {
    padding: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  companyButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 15,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default CompanyListScreen;