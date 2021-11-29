import React, { Component } from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ScrollView,
} from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial";


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
        this.setState({ isEnabled, devices });
        //console.log(this.state.devices);
      },
    );
    BluetoothSerial.on("bluetoothEnabled", () => {
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
        values => {
          const [isEnabled, devices] = values;
          this.setState({ devices });
          //console.log(this.state.devices);
        },
      );
      BluetoothSerial.on("bluetoothDisabled", () => {
        this.setState({ devices: [] });
        //console.log(this.state.devices);
      });

      BluetoothSerial.on("error", err => console.log(`Error: ${err.message}`));
    });
  }

  connect(device) {
    console.log(device);
    this.setState({ connected: true });
    BluetoothSerial.connect(device.id).then((res) => {
      console.log("Cihaz Bağlandı: " + device.name);
      ToastAndroid.show("Cihaz Bağlandı: " + device.name, ToastAndroid.SHORT);
    }).catch((e) => console.log(e.message));
  }

  _renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.connect(item.item)}>
        <View style={styles.deviceNameWrap}>
          <Text style={styles.deviceName}>{item.item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  enable() {
    BluetoothSerial.enable()
      .then(res => {
        this.setState({ isEnabled: true });
      })
      .catch(e => ToastAndroid.show(e.message));
    //console.log("enable " + this.state.devices);
  }

  disable() {
    BluetoothSerial.disable()
      .then(res => {
        this.setState({ isEnabled: false });
      })
      .catch(e => ToastAndroid.show(e.message));
    //console.log("disable " + this.state.isEnabled);
  }

  checkBluetooth(value) {
    if (value === true) {
      this.enable();
    } else {
      this.disable();
    }
  }

  /*discoverAvailableDevice() {
    if (!this.state.discovering) {
      return false;
    } else {
      this.setState({ discovering: true });
      BluetoothSerial.discoverUnpairedDevices().then((unPairedDevices) => {
        const uniqueDevices = _.uniqBy(unPairedDevices, "id");
        console.log(uniqueDevices);
        this.setState({ unPairDevices: uniqueDevices, discovering: false });
      }).catch((e) => ToastAndroid.show(e.message));
    }
  }*/

  sendOn() {

    BluetoothSerial.write("o").then((res) => {
      console.log(res);
      this.setState({ connected: true });
    }).catch((e) => console.log(e));

  }

  sendOff() {

    BluetoothSerial.write("f").then((res) => {
      console.log(res);
      this.setState({ connected: true });
    }).catch((e) => console.log(e));

  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={"#2E4C6D"} />
        <View style={styles.container}>
          <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity style={{ padding: 10, margin: 10, backgroundColor: "#FDFF8F", borderRadius: 5 }}
                              onPress={() => this.checkBluetooth(true)}>
              <Text style={{ color: "grey", fontSize: 18 }}>Bluetooth Aç</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, margin: 10, backgroundColor: "#A8ECE7", borderRadius: 5 }}
                              onPress={() => this.checkBluetooth(false)}>
              <Text style={{ color: "grey", fontSize: 18 }}>Bluetooth Kapat</Text>
            </TouchableOpacity>
          </View>
          {/*<TouchableOpacity style={{ padding: 10, margin: 10, backgroundColor: "#A8ECE7", borderRadius: 5 }}
                            onPress={this.discoverAvailableDevice.bind(this)}>
            <Text style={{ color: "grey", fontSize: 18 }}>Cihaz Tara</Text>
          </TouchableOpacity>*/}
          <FlatList contentContainerStyle={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}
                    data={this.state.devices}
                    renderItem={item => this._renderItem(item)}
                    keyExtractor={item => item.id} />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{
              padding: 10,
              margin: 10,
              backgroundColor: "#FF9292",
              borderRadius: 5,
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
                              onPress={this.sendOff.bind(this)}>
              <Text style={{ color: "white", fontSize: 18 }}>Sensörü Kapat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              padding: 10,
              margin: 10,
              backgroundColor: "#C1FFD7",
              borderRadius: 5,
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
                              onPress={this.sendOn.bind(this)}>
              <Text style={{ color: "grey", fontSize: 18 }}>Sensörü Aç</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
      ;
  }
}

const
  styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2E4C6D",
      flexDirection: "column",
    },
    deviceNameWrap: {
      margin: 10,
      padding: 10,
      borderWidth: 0.6,
      borderColor: "#FDFF8F",
      borderRadius: 5,
    },
    deviceName: {
      fontSize: 18,
    },
  });
