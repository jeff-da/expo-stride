import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import stripe from 'tipsi-stripe';
import testID from './utils/testID.js';
import Button from './utils/Button.js';

stripe.init({
  publishableKey: 'pk_test_YRjUHSZfJza9RsuNDx9s6e5V',
});

const theme = {
  primaryBackgroundColor: '#98FB98',
  secondaryBackgroundColor: '#98FB98',
  primaryForegroundColor: '#98FB98',
  secondaryForegroundColor: '#98FB98',
  accentColor: '#98FB98',
  errorColor: '#98FB98',
};

class App extends React.Component {

  state = {
    loading: false,
    allowed: false,
    token: 'Default',
    code: 'default',
  }

  async componentWillMount() {
    const allowed = await stripe.deviceSupportsAndroidPay()
    this.setState({ allowed })
  }

  handleAndroidPayPress = async () => {
    try {
      this.setState({
        loading: true,
        token: null,
      })
      const token = await stripe.paymentRequestWithAndroidPay({
        total_price: '0.10',
        currency_code: 'USD',
        line_items: [{
          currency_code: 'USD',
          description: 'Sushi',
          total_price: '0.02',
          unit_price: '0',
          quantity: '1',
        }, {
          currency_code: 'USD',
          description: 'La Croix',
          total_price: '0.03',
          unit_price: '0.03',
          quantity: '1',
        }, {
          currency_code: 'USD',
          description: 'Pizza',
          total_price: '0.05',
          unit_price: '0.05',
          quantity: '1',
        }],
      })
      console.log('Result:', token) // eslint-disable-line no-console
      this.setState({
        loading: false,
        token,
      })
    } catch (error) {
      console.log('Error is:', error) // eslint-disable-line no-console
      this.setState({
        loading: false,
      })
    }
  }

  onPaymentPress() {
    const options = {
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'zip', // or 'full'
      theme
    };
    stripe.paymentRequestWithCardForm(options)
      .then(response => {
        console.log(response);// Get the token from the response, and send to your server
        this.setState({
          loading: false,
          code: '' + response.tokenId,
        });
      })
      .catch(error => {
        // Handle error
      });
  }

  async onAndroidPayTestPress() {
    const options = {
      total_price: '0.50',
      currency_code: 'USD',
      line_items: [{
        currency_code: 'USD',
        description: 'La Croix',
        total_price: '0.20',
        unit_price: '0.20',
        quantity: '1',
      }, {
        currency_code: 'USD',
        description: 'Cool Beans',
        total_price: '0.30',
        unit_price: '0.30',
        quantity: '1',
      }],
    };

    /*stripe.paymentRequestWithAndroidPay(options)
      .then(response => {
        console.log(response);// Get the token from the response, and send to your server
        this.setState({
          loading: false,
          code: '' + response,
        });
      })
      .catch(error => {
        // Handle error
      });*/

    const item = await stripe.paymentRequestWithAndroidPay(options);

    console.log('thing: ' + item);
    // console.log('Android Pay token' + token);
    // this.setState({
    //   code: token;
    // });
  }

  render() {
    const { loading, allowed, token } = this.state;

    return (
      <View style={styles.container}>
        <Button
          text="Pay with Stripe"
          onPress={this.onPaymentPress}
        />
        <Button
          text="Pay with Android Pay"
          disabledText="Not supported"
          loading={loading}
          disabled={!allowed}
          onPress={this.onAndroidPayTestPress}
          {...testID('androidPayButton')}
        />
        <Text>
          Token: {this.state.code}
        </Text>
      </View>
    );
  }
}

/*<View
  style={styles.token}
  {...testID('androidPayToken')}>
  {token &&
    <Text style={styles.instruction}>
      Token: {token}
    </Text>
  }
</View>*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});

Expo.registerRootComponent(App);
