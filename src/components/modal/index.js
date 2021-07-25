import React from 'react';
import { TouchableOpacity, Modal as RNModal, View, Text, StyleSheet } from 'react-native';

class Modal extends React.PureComponent {
  render() {
    const { visible, status, level, moves, score } = this.props;
    return (
      <RNModal transparent={true} visible={visible}>
        <View style={styles.container}>
          <View style={styles.content}>
            {status === 'success' ? (
              <View style={styles.center}>
                <Text style={styles.successHeader}>Congratulations!</Text>
                <Text style={styles.successText}>You have completed this level {level} in {moves} moves</Text>
                <Text style={styles.successText}>Your Score: {score}</Text>
                <TouchableOpacity style={styles.successButton} onPress={() => this.props.proccedLevel(level < 10 ? 'success' : 'goback')}>
                  <Text style={styles.successButtonText}>{level < 10 ? 'Procced' : 'Return Home'}</Text>
                </TouchableOpacity>
              </View>
            ) : (
                <View style={styles.center}>
                  <Text style={styles.failureHeader}>Failure!</Text>
                  <Text style={styles.successText}>Try again this level to procced to next level</Text>
                  <TouchableOpacity style={styles.failureButton} onPress={() => this.props.proccedLevel('failure')}>
                    <Text style={styles.successButtonText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </View>
      </RNModal>
    )
  }
}

export default Modal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    marginHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    width: '90%',
    padding: 20
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  successHeader: {
    color: '#4B419A',
    fontSize: 24,
    fontWeight: 'bold'
  },
  successText: {
    paddingVertical: 10,
    fontSize: 16
  },
  successButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4B419A',
    borderRadius: 5,
    marginVertical: 10
  },
  successButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  failureHeader: {
    color: '#ff1e46',
    fontSize: 24,
    fontWeight: 'bold'
  },
  failureButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff1e46',
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 16
  }
})
