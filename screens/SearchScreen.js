import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const backgroundImages = [
  require('../assets/sera.jpg'),
  require('../assets/tundavala.jpg'),
  require('../assets/palancanegra.jpg'),
];

const logoImage = require('../assets/100destinosslogo.png');

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      fadeToNextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fadeToNextImage = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
      fadeAnim.setValue(0);
    });
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('CompanyList');
    }, 1500);
  };

  const currentImage = backgroundImages[currentImageIndex];
  const nextImageIndex = (currentImageIndex + 1) % backgroundImages.length;
  const nextImage = backgroundImages[nextImageIndex];

  return (
    <View style={styles.container}>
      <Animated.Image
        source={currentImage}
        style={[
          styles.backgroundImage,
          { opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) },
        ]}
      />
      <Animated.Image
        source={nextImage}
        style={[
          styles.backgroundImage,
          { opacity: fadeAnim },
        ]}
      />
      <View style={styles.overlay}>
        <Animatable.View animation="fadeIn" duration={1000} style={styles.content}>
          <Animatable.Image 
            source={logoImage}
            style={styles.logo}
            easing="ease-out" 
          />
          <Animatable.View animation="fadeInUp" delay={500} style={styles.searchContainer}>
            <Input
              placeholder="Seu Destino"
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="rgba(0,0,0,0.7)"
            />
            <Button
              title="Procurar"
              buttonStyle={styles.button}
              onPress={handleSearch}
              loading={loading}
              containerStyle={styles.buttonContainer}
            />
          </Animatable.View>
          {loading && (
            <Animatable.View 
              animation="pulse" 
              easing="ease-out" 
              iterationCount="infinite" 
              style={styles.loadingIndicator} 
            />
          )}
        </Animatable.View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>By ZRD3 Tecnologias</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: -130,
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  searchContainer: {
    width: '80%',
  },
  inputContainer: {
    borderBottomColor: 'rgba(255,255,255,0.5)',
  },
  input: {
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.5)",
    textAlign: 'center',
    color: '#000',
    fontWeight: "900",
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 5,
  },
  button: {
    backgroundColor: '#ff8e16',
    borderRadius: 25,
    paddingVertical: 12,
  },
  loadingIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff8e16',
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SearchScreen;