import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, Header } from 'react-native-elements';

import SearchScreen from './screens/SearchScreen';
import CompanyListScreen from './screens/CompanyListScreen';
import TimetableScreen from './screens/TimetableScreen';
import BookingInfoScreen from './screens/BookingInfoScreen';
import PaymentScreen from './screens/PaymentScreen';
import TicketScreen from './screens/TicketScreen';

const Stack = createStackNavigator();

const theme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#2196F3',
    background: '#F0F4F8',
  },
};

const screenOptions = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const CustomHeader = ({ title }) => (
  <Header
    centerComponent={{ text: title, style: { color: '#fff', fontSize: 20 } }}
    backgroundColor={theme.colors.primary}
  />
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search" screenOptions={screenOptions}>
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ header: () => <CustomHeader title="Pesquisar Viagens" /> }}
          />
          <Stack.Screen
            name="CompanyList"
            component={CompanyListScreen}
            options={{ header: () => <CustomHeader title="Empresas de Transporte" /> }}
          />
          <Stack.Screen
            name="Timetable"
            component={TimetableScreen}
            options={{ header: () => <CustomHeader title="Horários" /> }}
          />
          <Stack.Screen
            name="BookingInfo"
            component={BookingInfoScreen}
            options={{ header: () => <CustomHeader title="Informações de Reserva" /> }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ header: () => <CustomHeader title="Pagamento" /> }}
          />
          <Stack.Screen
            name="Ticket"
            component={TicketScreen}
            options={{ header: () => <CustomHeader title="Seu Bilhete" /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}