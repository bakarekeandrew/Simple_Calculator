import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('0');
  const [num1, setNum1] = useState(0);
  const [operand, setOperand] = useState('');

  const handlePress = (buttonText: string) => {
    if (buttonText === 'C') {
      setInput('');
      setNum1(0);
      setOperand('');
    } else if (['+', '-', '*', '/'].includes(buttonText)) {
      setNum1(parseFloat(input));
      setOperand(buttonText);
      setInput('');
    } else if (buttonText === '=') {
      const num2 = parseFloat(input);
      let result = num1;

      switch (operand) {
        case '+':
          result += num2;
          break;
        case '-':
          result -= num2;
          break;
        case '*':
          result *= num2;
          break;
        case '/':
          result /= num2;
          break;
      }

      setOutput(result.toString());
      setInput(result.toString());
      setNum1(0);
      setOperand('');
    } else {
      setInput(input + buttonText);
    }
  };

  const renderButton = (text: string, color: string) => (
    <TouchableOpacity
      key={text}
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => handlePress(text)}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{input}</Text>
      </View>
      {[
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['.', '0', '00', '+'],
        ['C', '=']
      ].map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((text) =>
            renderButton(text, text.match(/[+\-*/=]/) ? 'orange' : text === 'C' ? 'red' : 'grey')
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 10,
    justifyContent: 'flex-end',
  },
  display: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 48,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
