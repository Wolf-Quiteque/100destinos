import React, { useState } from 'react'; 
import { View, StyleSheet, Clipboard } from 'react-native';
import { Button, Text, CheckBox, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as DocumentPicker from 'expo-document-picker';

const paymentMethods = [
  { id: '1', name: 'Cartão de Crédito' },
  { id: '2', name: 'Transferência Bancária' },
  { id: '3', name: 'Pagamento Móvel' },
];

const PaymentScreen = ({ navigation, route }) => {
  const { bookingInfo, ride, company } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [step, setStep] = useState(1); // Track current step
  const [pdfFile, setPdfFile] = useState(null); // Track uploaded PDF

  const handleContinue = () => {
    setStep(2); // Move to PDF upload section
  };

  const handleUploadPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (result.type === 'success') {
      setPdfFile(result); // Save the uploaded PDF
    }
  };

  const handlePayment = () => {
    if (pdfFile) {
      // Here you would typically process the payment
      setStep(3); // Show confirmation message
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View 
        animation={step === 1 ? "fadeInDown" : "fadeOut"}
        duration={1000}
        style={step === 3 ? styles.hidden : {}}
      >
        <Text h4 style={styles.title}>100 Destions</Text>
        <Text style={styles.ibanText}>IBAN: DE12345678901234567890</Text>
        <Button 
          title="Copiar IBAN"
          onPress={() => {
            Clipboard.setString('DE12345678901234567890');
            alert('IBAN copiado para a área de transferência!');
          }}
          buttonStyle={styles.copyButton}
        />
        <Button
          title="Continuar"
          onPress={handleContinue}
          buttonStyle={styles.continueButton}
          containerStyle={styles.buttonContainer}
        />
      </Animatable.View>

      <Animatable.View 
        animation={step === 2 ? "fadeInUp" : "fadeOut"}
        duration={1000}
        style={step === 3 ? styles.hidden : {}}
      >
        <Text h4 style={styles.title}>Carrega Comprovativo (PDF)</Text>
        <Button
          title="Carregar PDF"
          onPress={handleUploadPDF}
          buttonStyle={styles.uploadButton}
        />
        {pdfFile && (
          <Text style={styles.fileName}>{pdfFile.name}</Text>
        )}
        <Button
          title="Confirmar Pagamento"
          onPress={handlePayment}
          disabled={!pdfFile}
          buttonStyle={styles.confirmButton}
        />
      </Animatable.View>

      <Animatable.View 
        animation={step === 3 ? "fadeIn" : "fadeOut"}
        duration={1000}
        style={step === 3 ? {} : styles.hidden}
      >
        <Text h4 style={styles.confirmationText}>Pagamento Confirmado, Obrigado! Boa Viagem!</Text>
      </Animatable.View>
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
  ibanText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  copyButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  fileName: {
    textAlign: 'center',
    marginVertical: 10,
  },
  confirmationText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  hidden: {
    display: 'none',
  },
});

export default PaymentScreen;
