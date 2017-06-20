import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import stripe from 'tipsi-stripe';

stripe.init({
  publishableKey: 'pk_test_YRjUHSZfJza9RsuNDx9s6e5V',
});

const theme = {
  primaryBackgroundColor: '#1851FF',
  secondaryBackgroundColor: '#1851FF',
  primaryForegroundColor: '#1851FF',
  secondaryForegroundColor: '#1851FF',
  accentColor: '#1851FF',
  errorColor: '#1851FF',
};

class App extends React.Component {

  componentDidMount() {

      const options = {
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'zip', // or 'full'
        theme
      };
      stripe.paymentRequestWithCardForm(options)
        .then(response => {
          // Get the token from the response, and send to your server
        })
        .catch(error => {
          // Handle error
        });
  }

  render() {
    return (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
