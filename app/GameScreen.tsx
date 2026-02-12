import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

import { useHeroAndDifficulty } from '../src/hooks/useHeroAndDifficulty';
import { HeroRoundIcon } from '../src/components/HeroRoundIcon';
import { HEROES } from '@/src/constants/heroes';
import { HeroType } from '@/src/types/HeroType';

export default function GameScreen() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);
  const [isPlayerMove, setIsPlayerMove] = useState<boolean>(true);
  const [enemy, setEnemy] = useState<HeroType>();
  const [modalVisible, setModalVisible] = useState(false);

  const { hero, difficulty } = useHeroAndDifficulty();

  useEffect(() => {
    const randomEnemyId = Math.round(Math.random() * 10);
    console.log(randomEnemyId);
    const randomEnemy = HEROES.find((item) => item.id === randomEnemyId)
    setEnemy(randomEnemy);
  }, []);

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
        // resetGame();
        return currBoard[a]
      }
    }

    if (!currBoard.includes(null)) {
      // resetGame();
      return 'draw';
    }

    // resetGame();
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerMove(true);
    setWinner(null);
  };

  // const getCellSign = (item: string | null) => {
  //   console.log('changed');
  //   if (item === 'player') {
  //     return 'X'
  //   } else if (item === 'ai') {
  //     return 'O'
  //   } else {
  //     return 'null';
  //   }
  // };

  return (
    <View style={styles.container}>
      <View>
        <Text>options</Text>
        {/* <Text>{hero}</Text> */}
        <Text>{difficulty}</Text>
      </View>

      <View style={styles.board}>
        {
          board.map((cell, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.cell,
                  index < 6 && styles.bottomBorder,
                  index % 3 !== 2 && styles.rightBorder,
                ]}
                onPress={() => { handleClick(index) }}
              >
                {
                  (cell === 'player' && hero) ? (
                    <HeroRoundIcon hero={hero} />
                  ) : (
                    (cell === 'ai' && enemy) && (<HeroRoundIcon hero={enemy} />)
                  )
                }

              </TouchableOpacity>
            );
          })
        }
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <Text> </Text>
        </View>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: 300,

    // justifyContent: 'center',
    // alignItems: 'center',

    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  bottomBorder: {
    borderBottomWidth: 10,
    borderBottomColor: '#fff',
  },

  cell: {
    height: 100,
    width: 100,

    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: '#dfd',

    // borderColor: '#000',
    // borderWidth: 10,
  },

  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  rightBorder: {
    borderRightWidth: 10,
    borderRightColor: '#fff',
  },
});
