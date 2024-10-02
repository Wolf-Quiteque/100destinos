import React from 'react';
import { View, StyleSheet, FlatList, ImageBackground, Text,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const companies = [
  { id: '1', name: 'Macon', img:"../assets/macon.jpg" },
  { id: '2', name: 'Humabo Express', img:"../assets/Huambo-Expresso.jpg"  },
  { id: '3', name: 'REAL Express',img:"../assets/maxresdefault.jpg" },
];

const CompanyListScreen = ({ navigation }) => {
  const renderItem = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" delay={index * 200}>
         <TouchableOpacity onPress={() => navigation.navigate('Timetable', { company: item })}>
        
      <ImageBackground
        source={item.img}
        style={styles.companyButton}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.buttonTitle}>{item.name}</Text>
        </View>
      </ImageBackground>
      </TouchableOpacity>   
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
  companyButton: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CompanyListScreen;
