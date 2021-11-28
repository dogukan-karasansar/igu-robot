import React, {Component} from 'react';
import {
  StatusBar,
  View,
  FlatList,
  Switch,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unPairDevices: [],
      connected: false,
    };
  }

  componentDidMount() {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;
        this.setState({isEnabled, devices});
        console.log(this.state.devices);
      },
    );
    BluetoothSerial.on('bluetoothEnabled', () => {
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
        values => {
          const [isEnabled, devices] = values;
          this.setState({devices});
          console.log(this.state.devices);
        },
      );
      BluetoothSerial.on('bluetoothDisabled', () => {
        this.setState({devices: []});
        console.log(this.state.devices);
      });

      BluetoothSerial.on('error', err => console.log(`Error: ${err.message}`));
    });
  }

  _renderItem(item) {
    return (
      <View style={styles.deviceNameWrap}>
        <Text style={styles.deviceName}>{item.item.name}</Text>
      </View>
    );
  }

  enable() {
    BluetoothSerial.enable()
      .then(res => {
        this.setState({isEnabled: true});
      })
      .catch(e => ToastAndroid.show(e.message));
    console.log('enable ' + this.state.devices);
  }

  disable() {
    BluetoothSerial.disable()
      .then(res => {
        this.setState({isEnabled: false});
      })
      .catch(e => ToastAndroid.show(e.message));
    console.log('disable ' + this.state.isEnabled);
  }

  toggleBluetooth(value) {
    console.log('value ' + value);
    if (value === true) {
      this.enable();
    } else {
      this.disable();
    }
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="white" />
        <View style={styles.container}>
          <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>Bluetooth Device List</Text>

            <View style={styles.toolbarButton}>
              <Switch
                value={this.state.isEnabled}
                onValueChange={val => this.toggleBluetooth(val)}
              />
            </View>
          </View>
          <FlatList
            style={{flex: 1}}
            data={this.state.devices}
            keyExtractor={item => item.id}
            renderItem={item => this._renderItem(item)}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'row',
  },
  toolbarButton: {
    width: 50,
    marginTop: 8,
  },
  toolbarTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    marginTop: 6,
    color: 'black',
  },
  deviceName: {
    fontSize: 17,
    color: 'black',
  },
  deviceNameWrap: {
    margin: 10,
    borderBottomWidth: 1,
  },
});
