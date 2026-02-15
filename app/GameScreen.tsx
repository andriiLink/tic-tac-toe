import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { router } from 'expo-router';

import { useHeroAndDifficulty } from '../src/hooks/useHeroAndDifficulty';
import { HeroRoundIcon } from '../src/components/HeroRoundIcon';
import { HEROES } from '@/src/constants/heroes';
import { HeroType } from '@/src/types/HeroType';
import { WinLoseDrawModal } from '@/src/components/WinLoseDrawModal';

export default function GameScreen() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);
  const [isPlayerMove, setIsPlayerMove] = useState<boolean>(true);
  const [enemy, setEnemy] = useState<HeroType | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { hero, difficulty } = useHeroAndDifficulty();

  useEffect(() => {
    let randomEnemyId = Math.round(Math.random() * 10);

    if (randomEnemyId === hero?.id) {
      randomEnemyId ++;
    }
    const randomEnemy = HEROES.find((item) => item.id === randomEnemyId) || null;
  
    setEnemy(randomEnemy);
  }, []);

  useEffect(() => {
    if (!isPlayerMove && !winner) {
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
  };

  const makeAiMove = () => {
    const emptyIndexs = board
      .map((item, index) => item === null ? index : null)
      .filter(item => item !== null) as number[];

    if (emptyIndexs.length > 0) {
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
        setTimeout(() => {
          console.log('setting modal visible');
          setModalVisible(true);
        }, 3000)
        return currBoard[a]
      }
    }

    if (!currBoard.includes(null)) {
      console.log('draw')
      setTimeout(() => {
        console.log('setting modal visible');
        setModalVisible(true);
      }, 3000)
      return 'draw';
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerMove(true);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
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

      <WinLoseDrawModal 
        modalVisible={modalVisible} 
        onChangeVisible={setModalVisible}
        winner={winner}
        hero={hero}
        enemy={enemy}
        onResetGame={resetGame}
      />
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
