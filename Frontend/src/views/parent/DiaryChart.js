import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// fetch
import {
  getWordFrequency,
  getWordCloudImage,
  getDiaryStats,
  getCommitCount,
} from '../../api/statistics/readStatistics';

// components
import AuthBackGround from '../../components/authorization/AuthBackGround';
import Header from '../../components/elements/Header';
import DiaryBarChart from '../../components/charts/DiaryBarChart';
import WordPieChart from '../../components/charts/WordPieChart';
import HeatMapChart from '../../components/charts/HeatMapChart';

const transformMonth = (mon) => {
  const nowMon = mon + 1;
  const res = String(nowMon).length === 1 ? '0' + String(nowMon) : nowMon;
  return res;
};

// static variables
const date = new Date();
const year = date.getFullYear();
const getMonth = date.getMonth() + 1;
const month = transformMonth(getMonth);
const randomColors = [
  '#8e24aa',
  '#ea80fc',
  '#8c9eff',
  '#80d8ff',
  '#a7ffeb',
  '#ccff90',
  '#ffff8d',
  '#5c6bc0',
  '#ff9e80',
  '#90a4ae',
];

const generateMonthLabel = (startMonth) => {
  const monthLabels = Array.from({length: 12}, (v, index) =>
    transformMonth(index),
  );

  const leftLabels = monthLabels
    .slice(startMonth)
    .map((label) => `${year - 1}.${label}`);

  const rightLabels = monthLabels
    .slice(0, startMonth)
    .map((label) => `${year}.${label}`);

  const returnLabels = leftLabels.concat(rightLabels);

  // return example : [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]

  return returnLabels;
};

function DiaryChart({route}) {
  const profilePK = route.params.profilePK;
  const [diaryStats, setDiaryStats] = useState();
  const [wordFreq, setWordFreq] = useState();
  const [wordCloudImage, setWordCloudImage] = useState();
  const [commitCount, setCommitCount] = useState();
  const [selectedChart, setSelectedChart] = useState(0);

  // return [{date: "2021.03", value: 16}, ...]
  const generateDiaryStatsData = (diaryData) => {
    const generatedMonthLabel = generateMonthLabel(getMonth); // 최근이 가장 마지막으로 오도록 정렬
    const diaryCountByChildCnt = diaryData.child_cnt;
    const diaryCountByAgeChildCnt = diaryData.age_child_cnt;
    const diaryCountByUserChildCnt = diaryData.user_child_cnt;
    const resData = [];

    for (let i = 0; i < diaryCountByChildCnt.length; i++) {
      resData.push({
        date: generatedMonthLabel[i],
        value: diaryCountByChildCnt[i],
        valueAge: diaryCountByAgeChildCnt[i],
        valueUser: diaryCountByUserChildCnt[i],
      });
    }

    return resData;
  };

  const generateWordFreqData = (wordData) => {
    const average = wordData.average; // 단어당 평균 사용 횟수
    const total = wordData.total; // 총 단어 사용 횟수
    const words = wordData.words; // 가장 많이 사용하는 단어 Top 10, {content, count, rate}

    const resData = words.map((word, index) => {
      const mappingWord = {
        word: word.content,
        count: word.count,
      };

      return mappingWord;
    });

    return resData;
  };

  const fetchWordFrequency = useCallback(() => {
    getWordFrequency(
      profilePK,
      (res) => {
        setWordFreq(res.data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [profilePK]);

  const fetchWordCloudImage = useCallback(() => {
    getWordCloudImage(
      profilePK,
      (res) => {
        setWordCloudImage(res.data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [profilePK]);

  const fetchDiaryStats = useCallback(() => {
    getDiaryStats(
      {child: profilePK, year, month},
      (res) => {
        if (res.data) {
          const data = {
            ...res.data,
            age_child_cnt: res.data.age_child_cnt.reverse(),
          };
          setDiaryStats(data);
        }
      },
      (error) => {
        console.error(error);
      },
    );
  }, [profilePK]);

  const fetchCommitCount = useCallback(() => {
    getCommitCount(
      {child: profilePK, year},
      (res) => {
        setCommitCount(res.data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [profilePK]);

  useEffect(() => {
    fetchWordFrequency();
    fetchWordCloudImage();
    fetchDiaryStats();
    fetchCommitCount();
  }, [
    fetchWordFrequency,
    fetchWordCloudImage,
    fetchDiaryStats,
    fetchCommitCount,
  ]);

  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => setSelectedChart(0)}
          style={[
            styles.changeButton,
            {
              backgroundColor: selectedChart === 0 ? '#fca311' : '#e5e5e5',
            },
          ]}>
          <Text
            style={[
              styles.headerText,
              {
                color: selectedChart === 0 ? 'white' : '#707070',
                fontWeight: selectedChart === 0 ? 'bold' : 'normal',
              },
            ]}>
            매월 일기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedChart(1)}
          style={[
            styles.changeButton,
            {
              backgroundColor: selectedChart === 1 ? '#fca311' : '#e5e5e5',
            },
          ]}>
          <Text
            style={[
              styles.headerText,
              {
                color: selectedChart === 1 ? 'white' : '#707070',
                fontWeight: selectedChart === 1 ? 'bold' : 'normal',
              },
            ]}>
            단어 사용
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedChart(2)}
          style={[
            styles.changeButton,
            {
              backgroundColor: selectedChart === 2 ? '#fca311' : '#e5e5e5',
            },
          ]}>
          <Text
            style={[
              styles.headerText,
              {
                color: selectedChart === 2 ? 'white' : '#707070',
                fontWeight: selectedChart === 2 ? 'bold' : 'normal',
              },
            ]}>
            매일 기록
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {selectedChart === 0 && diaryStats && (
          <DiaryBarChart data={generateDiaryStatsData(diaryStats)} />
        )}
        {selectedChart === 1 && wordCloudImage && wordFreq && (
          <WordPieChart
            data={generateWordFreqData(wordFreq)}
            imageSrc={wordCloudImage}
          />
        )}
        {selectedChart === 2 && commitCount && (
          <HeatMapChart data={commitCount} />
        )}
      </View>
    </AuthBackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(70),
    minWidth: wp(95),
    minHeight: hp(70),
    backgroundColor: 'white',
    marginTop: hp(7),
    display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 7,
  },
  headerContainer: {
    width: wp(50),
    minHeight: hp(10),
    marginTop: wp(2),
    borderRadius: 20,
    elevation: 7,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  changeButton: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    borderRadius: 15,
  },
  headerText: {
    fontSize: wp(2),
  },
});

export default DiaryChart;
