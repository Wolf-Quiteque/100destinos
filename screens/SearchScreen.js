import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('CompanyList');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" duration={1000} style={styles.searchContainer}>
        <Input
          placeholder="Procurar viagens"
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Button
          title={loading ? "Procurando..." : "Procurar"}
          onPress={handleSearch}
          buttonStyle={styles.button}
          loading={loading}
        />
      </Animatable.View>
      {loading && (
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <View style={styles.loadingIndicator} />
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  searchContainer: {
    width: '80%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  loadingIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginTop: 20,
  },
});

export default SearchScreen;