import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('0');
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operand, setOperand] = useState<string>('');

  const buttonPressed = (buttonText: string) => {
    if (buttonText === 'C') {
      setInput('');
      setNum1(0);
      setNum2(0);
      setOperand('');
    } else if (['+', '-', '*', '/'].includes(buttonText)) {
      setNum1(parseFloat(input));
      setOperand(buttonText);
      setInput('');
    } else if (buttonText === '.') {
      if (!input.includes('.')) {
        setInput(input + buttonText);
      }
    } else if (buttonText === '=') {
      setNum2(parseFloat(input));
      let result;
      switch (operand) {
        case '+':
          result = num1 + parseFloat(input);
          break;
        case '-':
          result = num1 - parseFloat(input);
          break;
        case '*':
          result = num1 * parseFloat(input);
          break;
        case '/':
          result = num1 / parseFloat(input);
          break;
        default:
          result = parseFloat(input);
          break;
      }
      setOutput(result.toString());
      setInput(result.toString());
      setNum1(0);
      setNum2(0);
      setOperand('');
    } else {
      setInput(input + buttonText);
    }
  };

  const buildButton = (buttonText: string, buttonColor: string, textColor: string) => (
    <TouchableOpacity
      key={buttonText} // Unique key for each button
      onPress={() => buttonPressed(buttonText)}
      style={[styles.button, { backgroundColor: buttonColor }]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{buttonText}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{input}</Text>
      </View>
      <View style={styles.row}>
        {['7', '8', '9', '/'].map((text) =>
          buildButton(text, text === '/' ? 'orange' : 'grey', 'white')
        )}
      </View>
      <View style={styles.row}>
        {['4', '5', '6', '*'].map((text) =>
          buildButton(text, text === '*' ? 'orange' : 'grey', 'white')
        )}
      </View>
      <View style={styles.row}>
        {['1', '2', '3', '-'].map((text) =>
          buildButton(text, text === '-' ? 'orange' : 'grey', 'white')
        )}
      </View>
      <View style={styles.row}>
        {['.', '0', '00', '+'].map((text) =>
          buildButton(text, text === '+' ? 'orange' : 'grey', 'white')
        )}
      </View>
      <View style={styles.row}>
        {['C', '='].map((text) =>
          buildButton(text, text === '=' ? 'green' : 'red', 'white')
        )}
      </View>
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
  },
});

export default App;
