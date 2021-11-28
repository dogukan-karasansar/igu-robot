import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, StyleSheet, View, Text} from 'react-native';

import {HomeColor} from '../assets/color/ScreenColor';

const Home = () => {
  //states
  const [counter, setCounter] = useState(3);
  const [status, setStatus] = useState(false);
  const [powerColor, setPowerColor] = useState('white');

  //control
  isPower = status => {
    setStatus(!status);
    if (status == true) {
      setPowerColor('white');
    } else {
      setPowerColor('black');
    }
    console.log(status);
  };

  UpperTimer = counter => {
    setCounter((counter += 3));
  };

  DownTimer = counter => {
    if (counter > 3) {
      setCounter((counter -= 3));
    } else {
      setCounter(counter);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.power, {backgroundColor: powerColor}]}>
        {status == false ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => isPower(status)}
            style={{zIndex: 0.5}}>
            <Image
              style={styles.powerIcon}
              source={require('../assets/images/power-on.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => isPower(status)}
            style={{zIndex: 0.5}}>
            <Image
              style={styles.powerIcon}
              source={require('../assets/images/power-off.png')}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.notificationCounter}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 32,
            marginRight: 25,
          }}>
          BİLDİRİM SÜRESİ
        </Text>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => UpperTimer(counter)}>
            <Image
              style={styles.countIcons}
              source={require('../assets/images/up-arrow.png')}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            {counter}
          </Text>
          <TouchableOpacity onPress={() => DownTimer(counter)}>
            <Image
              style={styles.countIcons}
              source={require('../assets/images/down-arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HomeColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  power: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  powerIcon: {
    
    width: 100,
    height: 100,
  },
  countIcons: {
    width: 30,
    height: 30,
  },
  notificationCounter: {
    flexDirection: 'row',
    marginTop: 75,
  },
});

export default Home;
