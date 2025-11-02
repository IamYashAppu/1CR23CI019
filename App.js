import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={decreaseCount}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetCount}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={increaseCount}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#FF9800',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});