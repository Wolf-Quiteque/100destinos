import React, { useState } from 'react';
import { View, StyleSheet, Clipboard, ScrollView, Image, TouchableOpacity,Linking } from 'react-native';
import { Button, Text, Input, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
const logoImage = require('../assets/100destinosslogo.png');

const banks = [
  { id: '1', name: 'MCX' ,img: require('../assets/bancos/mcx.png'), playStoreUrl:"https://play.google.com/store/apps/details?id=com.sibsint.mcxwallet",appStoreUrl:"",scheme:"com.sibsint.mcxwallet://"},
  { id: '2', name: 'BAI', img: require('../assets/bancos/bai.jpeg'),playStoreUrl:"",appStoreUrl:"", scheme:"baibank://"},
  { id: '3', name: 'BFA', img: require('../assets/bancos/bfa.png')  },
  { id: '4', name: 'BIC', img: require('../assets/bancos/bic.jpeg') },
  { id: '5', name: 'BPC', img: require('../assets/bancos/bpc.jpg') },
  { id: '6', name: 'KEVE', img: require('../assets/bancos/keve.png') },
  { id: '7', name: 'SOL', img: require('../assets/bancos/sol.jpeg') },
  { id: '8', name: 'STANDARD', img: require('../assets/bancos/standardbank.jpeg') },
  { id: '9', name: 'YETU', img: require('../assets/bancos/yetu.png') },
];

const PaymentScreen = ({ navigation, route }) => {
  const { bookingInfo, ride, company } = route.params;
  
  const calculateTotal = () => {
    // Dummy calculation of total cost (e.g., 50 per passenger)
    return `${bookingInfo.length * 1}`;

  };

  const [ibanCopied, setIbanCopied] = useState(true);
  const [selectedBank, setSelectedBank] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfChecked, setpdfChecked] = useState(false);


  const handleCopyIban = () => {
    Clipboard.setString('005500001009648010129');
  };

  const handleSelectBank = (bank) => {

    setSelectedBank(bank);

    return false;
    Linking.canOpenURL(bank.scheme)
    .then((supported) => {
      if (!supported) {
        // If app is not installed, open the Play Store or App Store link
        const storeUrl = Platform.OS === 'android' ? bank.playStoreUrl : bank.appStoreUrl;
        Alert.alert('App not installed', 'It seems BAI Directo is not installed. Redirecting to the store.');
        Linking.openURL(storeUrl);
      } else {
        // Open the app using the custom URL scheme
        return Linking.openURL(bank.scheme);
      }
    })
    .catch((err) => console.error('An error occurred', err));
  };

  const handleUploadPDF = async () => {
    const Total = calculateTotal()
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf", // Only allow PDF files
    });
    
    console.log(result)
    if (result.assets[0]) {
      setPdfFile(result.assets[0]);

      try { 
      const { uri, name, mimeType } = result.assets[0];

            // Step 3: Convert the file to a format suitable for posting (using FormData)
            const formData = new FormData();
            formData.append('file', {
                uri,
                name,  // File name
                type: mimeType || 'application/pdf',  // MIME type
            });

            // Step 4: Send the file to your backend using fetch
            const response = await fetch('https://verifica-jet.vercel.app/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const jsonResponse = await response.json();


            if(jsonResponse.original){
              var myVariable = jsonResponse.text
              if (myVariable.includes(Total)  && myVariable.includes("AO06.0055.0000.1009.6480.1012.9") || myVariable.includes("AO06 0055 0000 1009 6480 1012 9") || myVariable.includes("AO06005500001009648010129")) {
                setpdfChecked(true)
                return false
              }
            }

              alert("COMPROVATIVO REIJEITADO, por favor tenta novamente.")
              setPdfFile(null)
        } catch (error) {
            console.error('Error picking or uploading document:', error);
        }

    } 
  };

  const handlePayment = () => {
    // Process payment logic here
    alert('Pagamento Confirmado, Obrigado! Boa Viagem!');
    navigation.navigate('Search');

  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" duration={1000}>
      <Image
       source={logoImage}
       style={styles.logo}
      />
        <Text style={styles.ibanText}>IBAN: 0055 0000 10096480101 29</Text>
        <Text style={styles.ibanTextName}>Zrd3 comercio e prestação de serviço</Text>

        
        <Button 
          title="005500001009648010129"
          type="outline"
          icon={<Icon name="content-copy" size={20} color="#ff8e16" />}
          onPress={handleCopyIban}
          buttonStyle={styles.copyButton}
        />
      </Animatable.View>

      {ibanCopied && (
        <Animatable.View animation="fadeIn" duration={1000}>
          <Text style={styles.sectionTitle}>Selecione o seu banco:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bankScroll}>
            {banks.map((bank) => (
              <TouchableOpacity 
                key={bank.id} 
                onPress={() => handleSelectBank(bank)}
                style={[
                  styles.bankImageContainer,
                  selectedBank?.id === bank.id && styles.selectedBank
                ]}
              >
                <Image
                  source={bank.img}
                  style={styles.bankImage}
                />
                <Text style={styles.bankName}>{bank.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Button
            title="Carregar Comprovativo (PDF)"
            onPress={handleUploadPDF}
            buttonStyle={styles.uploadButton}
          />
          {pdfFile && (
            <Text style={styles.fileName}>{pdfFile.name || 'Comprovativo carregado'}</Text>
          )}

          <Button
            title="Confirmar Pagamento"
            onPress={handlePayment}
            disabled={!selectedBank || !pdfFile || !pdfChecked}
            buttonStyle={styles.confirmButton}
          />
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    marginTop: -100,
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  ibanText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5,
  },
  ibanTextName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight:900,
    marginBottom: 30,
  },
  copyButton: {
    borderColor: '#ff8e16',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  bankScroll: {
    marginBottom: 20,
    marginTop: 40,

  },
  bankImageContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  bankImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  bankName: {
    marginTop: 5,
    fontSize: 12,
  },
  selectedBank: {
    borderColor: '#ff8e16',
    borderWidth: 2,
    borderRadius: 32,
    padding: 2,
  },
  uploadButton: {
    marginTop:50,
    backgroundColor: '#ff8e16',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#ff8e16',
  },
  fileName: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default PaymentScreen;