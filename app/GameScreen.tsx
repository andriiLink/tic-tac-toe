import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useHeroAndDifficulty } from '../src/hooks/useHeroAndDifficulty';

export default function GameScreen() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);
  const [isPlayerMove, setIsPlayerMove] = useState<boolean>(true);

  const { heroId, difficulty } = useHeroAndDifficulty();

  useEffect(() => {
    if (!isPlayerMove && !winner) {
      console.log('ais turn (effect)');

      const timer = setTimeout(() => {
        makeAiMove();
      }, 600);

      return () => { clearTimeout(timer) };
    }
  }, [isPlayerMove, winner]);

  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const handleClick = (index: number) => {
    console.log('clicked');
    if (board[index] || !isPlayerMove || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = 'player';

    setBoard(newBoard);

    const result = checkWinner(newBoard);

    if (result) {
      setWinner(result);
    } else {
      setIsPlayerMove(false);
    }

    console.log('clicked 2');
  };

  const makeAiMove = () => {
    console.log('ais turn topfunc')
    const emptyIndexs = board
      .map((item, index) => item === null ? index : null)
      .filter(item => item !== null) as number[];

    if (emptyIndexs.length > 0) {
      console.log('in proces')
      const randomIndex = emptyIndexs[Math.floor(Math.random() * emptyIndexs.length)];
      const newBoard = [...board];
      newBoard[randomIndex] = 'ai';

      console.log(newBoard);
      setBoard(newBoard);

      const result = checkWinner(newBoard);

      if (result) {
        setWinner(result);
      } else {
        setIsPlayerMove(true);
      }
    };
  };

  const checkWinner = (currBoard: (string | null)[]) => {
    for (const winLine of winCombinations) {
      const [a, b, c] = winLine;

      if (currBoard[a] && currBoard[a] === currBoard[b] && currBoard[a] === currBoard[c]) {
        return currBoard[a]
      }
    }

    if (!currBoard.includes(null)) {
      return 'draw';
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerMove(true);
    setWinner(null);
  };

  const getCellSign = (item: string | null) => {
    console.log('changed');
    if (item === 'player') {
      return 'X'
    } else if (item === 'ai') {
      return 'O'
    } else {
      return 'null';
    }
  };

  return (
    <View>
      <View>
        <Text>options</Text>
        <Text>{heroId}</Text>
        <Text>{difficulty}</Text>

        <View>
          {
            board.map((cell, index) => {
              return (
                <View key={index}>
                  <Pressable
                    onPress={() => { handleClick(index) }}
                  >
                    <Text>{cell === 'player' ? 'X' : cell === 'ai' ? 'O' : ' '}</Text>
                  </Pressable>
                </View>
              );
            })
          }
        </View>
      </View>
    </View>
  );
};
