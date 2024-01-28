import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, Alert } from 'react-native';

const App = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  useEffect(() => {
    const winner = checkWinner(cells);
    if (winner) {
      Alert.alert("Game Over", `Winner: ${winner}`);
      resetBoard();
    } else if (cells.every(cell => cell !== null)) {
      Alert.alert("Game Over", "It's a Draw!");
      resetBoard();
    }
  }, [cells]);

  const handlePress = (index) => {
    if (cells[index]) {
      return;
    }
    const newCells = [...cells];
    newCells[index] = isXTurn ? 'X' : 'O';
    setCells(newCells);
    setIsXTurn(!isXTurn);
  };

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setCells(Array(9).fill(null));
    setIsXTurn(true);
  };

  const renderCell = (index) => {
    let cellStyle = styles.cellText;
    if (cells[index] === 'X') {
      cellStyle = [styles.cellText, styles.cellTextX];
    } else if (cells[index] === 'O') {
      cellStyle = [styles.cellText, styles.cellTextO];
    }
  
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => handlePress(index)}>
        <Text style={cellStyle}>{cells[index]}</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.status}>Next player: {isXTurn ? 'X' : 'O'}</Text>
      <View style={styles.board}>
        <View style={styles.row}>{[0, 1, 2].map(index => renderCell(index))}</View>
        <View style={styles.row}>{[3, 4, 5].map(index => renderCell(index))}</View>
        <View style={styles.row}>{[6, 7, 8].map(index => renderCell(index))}</View>
      </View>
      <Button title="Reset" onPress={resetBoard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    textDecorationColor: "#00ffff",
  },
  board: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#00ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 30,
  },
  cellTextX: {
    color: 'red', 
  },
  cellTextO: {
    color: '#7fff00', 
  },
  status: {
    marginBottom: 20,
    fontSize: 40,
    backgroundColor: '#00ffff',
  },
});

export default App;
