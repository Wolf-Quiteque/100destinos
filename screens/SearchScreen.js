import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const backgroundImages = [
  'https://picsum.photos/800/1200?random=1',
  'https://picsum.photos/800/1200?random=2',
  'https://picsum.photos/800/1200?random=3',
];

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
        source={{ uri: currentImage }}
        style={[
          styles.backgroundImage,
          { opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) },
        ]}
      />
      <Animated.Image
        source={{ uri: nextImage }}
        style={[
          styles.backgroundImage,
          { opacity: fadeAnim },
        ]}
      />
      <View style={styles.overlay}>
        <Animatable.View animation="fadeIn" duration={1000} style={styles.content}>
          <Animatable.Text 
            animation="pulse" 
            easing="ease-out" 
            iterationCount="infinite" 
            style={styles.logo}
          >
            100 Destinos
          </Animatable.Text>
          <Animatable.View animation="fadeInUp" delay={500} style={styles.searchContainer}>
            <Input
              placeholder="Seu Destino"
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="rgba(255,255,255,0.7)"
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 40,
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  searchContainer: {
    width: '80%',
  },
  inputContainer: {
    borderBottomColor: 'rgba(255,255,255,0.5)',
  },
  input: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 12,
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