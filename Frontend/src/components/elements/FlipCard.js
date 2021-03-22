import React, {useState} from 'react';
import {Animated, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
//  english : 영어 단어, korean: 뜻, pos(part of speech): 품사, exampleSentence: 예시문장
export default function FlipCard({english, korean, pos, exampleSentence}) {
  const animationvalue = new Animated.Value(0);

  let temp = 0;

  animationvalue.addListener((e) => {
    temp = e.value;
  });

  const frontflipRange = animationvalue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backflipRange = animationvalue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const t_transform_front = {
    transform: [{rotateY: frontflipRange}],
  };

  const t_transform_back = {
    transform: [{rotateY: backflipRange}],
  };

  const flip = () => {
    if (temp < 90) {
      Animated.timing(animationvalue, {
        toValue: 180,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animationvalue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card]}
      onPress={() => flip()}
      activeOpacity={1}>
      <Animated.View style={[t_transform_front, styles.front]}>
        <Text style={[styles.word]}>{english}</Text>
      </Animated.View>
      <Animated.View style={[t_transform_back, styles.back]}>
        <View style={[styles.backWordBox]}>
          <Text style={[styles.word]}>{korean}</Text>
          <Text style={[styles.wordClass]}>{pos}</Text>
        </View>
        <View style={styles.backSentenceBox}>
          <Text style={[styles.wordSentence]}>{exampleSentence}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ffe',
  },

  card: {
    position: 'relative',
    width: 260,
    height: 338,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
  },
  front: {
    position: 'absolute',
    width: 260,
    height: 338,
    backgroundColor: '#f0859f',
    backfaceVisibility: 'hidden',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  back: {
    position: 'absolute',
    width: 260,
    height: 338,
    backgroundColor: '#76b0e9',
    backfaceVisibility: 'hidden',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    padding: '5%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  word: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'HoonPinkpungchaR',
  },
  wordClass: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'HoonPinkpungchaR',
  },
  wordSentence: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    fontWeight: '500',
  },
  backWordBox: {
    width: '100%',
    height: '45%',
    display: 'flex',
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  backSentenceBox: {
    width: '100%',
    height: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 15,
  },
});