import React from 'react';
import { connect } from 'react-redux';
import Card from '../../components/card';
import Modal from '../../components/modal';
import CountDownTimer from '../../components/timer';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { setGameLevel, updateGameData } from '../../store/actions/game.action';


const { width } = Dimensions.get('window');

class Game extends React.PureComponent {
  constructor(props) {

    super(props)
    let numberOfColumns = this.props.levels[this.props.currentLevel].numberOfColumns;
    this.state = {
      numberOfColumns: 4,
      itemContainerDimension: Math.floor((width - 60) / numberOfColumns),
      data: this.props.levels[this.props.currentLevel].data,
      selectedCard: [],
      selectedIndex: [],
      nextPair: false,
      showModal: false,
      gameStatus: '',
      moves: 0,
      score: 0,
      resetTimer: false,
      stopTimer: false
    }
  }

  setSelectedCard = (item, index) => {


    const { selectedCard, selectedIndex, nextPair, moves, score } = this.state;


    if (!selectedCard.length) {
      console.log("1")
      this.setState({ selectedCard: [item], selectedIndex: [index], moves: moves + 1, score: score });
    } else {
      console.log("2")
      let cardData = [...selectedCard];
      let cardIndex = [...selectedIndex];
      let lastValue = cardData[cardData.length - 1];

      console.log("cardData", cardData)
      console.log("cardIndex", cardIndex)
      console.log("lastValue", lastValue)

      console.log("nextPair", nextPair)
      if (!nextPair) {
        console.log(3)
        let nextPairValue = nextPair;
        if (lastValue === item) {
          cardData.push(item);
          nextPairValue = true;
        } else {
          cardIndex.splice(cardIndex.indexOf(index), 1);
          nextPairValue = false;
        }
        this.setState({ selectedCard: cardData, selectedIndex: cardIndex, nextPair: nextPairValue, moves: moves + 1 }, () => {
          if (this.state.selectedCard.length === this.state.data.length) {
            this.setState({ showModal: true, gameStatus: 'success', stopTimer: true });
          }
        });
      } else {
        cardData.push(item);
        cardIndex.push(index);
        this.setState({ selectedCard: cardData, selectedIndex: cardIndex, nextPair: false, moves: moves + 1, score: score + 10 });
      }
    }
  }

  setSelectedIndex = (index) => {
    let selectedIndex = [...this.state.selectedIndex];
    if (selectedIndex.indexOf(index) === -1) {
      selectedIndex.push(index);
      this.setState({ selectedIndex });
    }
  }

  timesUp = () => {
    let gameStatus = this.state.selectedCard.length === this.state.data.length ? 'success' : 'failure';
    this.setState({ showModal: true, gameStatus, stopTimer: true });
  }

  proccedLevel = type => {
    let initialeState = {
      selectedCard: [],
      selectedIndex: [],
      nextPair: false,
      showModal: false,
      gameStatus: '',
      moves: 0,
      score: 0,
      resetTimer: !this.state.resetTimer,
      stopTimer: false
    }
    if (type === 'success') {
      let nextLevel = this.props.currentLevel + 1;
      let data = { ...this.props.levels };
      data[this.props.currentLevel].isCompleted = true;
      this.props.updateGameData(data);
      this.props.setGameLevel(nextLevel);
      let numberOfColumns = this.props.levels[nextLevel].numberOfColumns;
      this.setState({
        numberOfColumns,
        itemContainerDimension: Math.floor((width - 60) / numberOfColumns),
        data: this.props.levels[nextLevel].data,
        ...initialeState
      })
    } else {
      this.setState(initialeState);
      if (type === 'goback') {
        let data = { ...this.props.levels };
        data[this.props.currentLevel].isCompleted = true;
        this.props.updateGameData(data);
        this.props.navigation.goBack();
      }
    }
  }

  renderItem = ({ item, index }) => {

    return (
      <Card
        isFlipped={this.state.selectedIndex.includes(index)}
        height={this.state.itemContainerDimension}
        width={this.state.itemContainerDimension}
        item={item}
        index={index}
        setSelectedCard={(item, index) => this.setSelectedCard(item, index)}
        setSelectedIndex={(index) => this.setSelectedIndex(index)}
      />
    );
  }

  render() {
    const { data, numberOfColumns, showModal, gameStatus, score, moves, resetTimer, stopTimer } = this.state;
    const { currentLevel } = this.props;

    return (
      <View style={styles.flex}>
        <View style={styles.levelContainer}>
          <View style={styles.alignCenter}>
            <Text style={styles.headerText}>Turns</Text>
            <Text>{moves}</Text>
          </View>
          <View style={styles.alignCenter}>
            <Text style={styles.headerText}>Score</Text>
            <Text>{score}</Text>
          </View>
        </View>
        <View style={styles.alignCenter}>
          <Text style={styles.headerText}>Time Left</Text>
          <CountDownTimer timesUp={() => this.timesUp()} resetTimer={resetTimer} stopTimer={stopTimer} />
        </View>
        <FlatList
          data={data}
          key={numberOfColumns}
          extraData={this.state}
          numColumns={numberOfColumns}
          renderItem={this.renderItem}
          keyExtractor={(item) => `level${item}`}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={styles.flatlistContainer}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={{
            height: 50,

            backgroundColor: '#000000',
            borderRadius: 20 / 1.5,
            alignItems: 'center',
            justifyContent: 'center',

            margin: 20,
            marginBottom: 60

          }}
          onPress={() => {
            let initialeState = {
              selectedCard: [],
              selectedIndex: [],
              nextPair: false,
              showModal: false,
              gameStatus: '',
              moves: 0,
              score: 0,
              resetTimer: !this.state.resetTimer,
              stopTimer: false
            }
            this.setState(initialeState);

            let data = { ...this.props.levels };
            data[this.props.currentLevel].isCompleted = false;
            this.props.updateGameData(data);



          }}

        >
          <Text style={{ color: '#FFFFFF' }}>RESTART</Text>
        </TouchableOpacity>


        {
          showModal &&
          <Modal
            visible={showModal}
            status={gameStatus}
            level={currentLevel}
            score={score}
            moves={moves}
            proccedLevel={(type) => this.proccedLevel(type)}
          />
        }
      </View >
    );
  }
}

const mapStateToProps = state => ({
  currentLevel: state.game.currentLevel,
  levels: state.game.levels
});

const mapDispatchToProps = (dispatch) => ({
  setGameLevel: data => {
    console.log(JSON.stringify(data))
    dispatch(setGameLevel(data))
  },
  setGameLevel: data => dispatch(setGameLevel(data)),
  updateGameData: data => dispatch(updateGameData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  levelContainer: {
    paddingVertical: 15,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  alignCenter: {
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B419A'
  },
  flatlistContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});