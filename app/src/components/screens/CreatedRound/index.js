import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Spinner, Button} from 'native-base';
import colors from '../../components/colors';

import SubMenuContainer from '../roundsCreation/steps/RoundDetail/SubMenuContainer';
import Period from '../roundsCreation/steps/RoundDetail/Period';
import ExtraData from '../roundsCreation/steps/RoundDetail/ExtraData';
import ParticipantsList from './ParticipantsList';

import {connect} from 'react-redux';
import * as roundsActions from '../../../actions/rounds';

const CreatedRound = props => {
  useEffect(() => {}, []);

  const {round, startRound, start_round} = props;

  // Check all participans = acepted=true
  const startable =
    round.participants.filter(e => e.acepted === true).length ===
    round.participants.length;

  const buttonStartRound = () => {
    start_round(round.id);
  };
  const customStartDate = new Date(round.startDate);
  const customEndDate = new Date(round.endDate);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{}}>
        <SubMenuContainer>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{round.name}</Text>
          </View>
        </SubMenuContainer>

        <Period
          startDate={`${customStartDate.getDate()}/${customStartDate.getMonth()}/${customStartDate.getFullYear()}`}
          endDate={`${customEndDate.getDate()}/${customEndDate.getMonth()}/${customEndDate.getFullYear()}`}
        />

        <ExtraData
          roundAmount={round.amount}
          value={round.amount / round.participants.length}
          frequency={round.recurrence}
        />

        <ParticipantsList
          {...props}
          shifts={round.shifts}
          participants={round.participants}
        />

        <View style={styles.buttonContainer}>
          {startRound.loading ? (
            <Spinner />
          ) : startable ? (
            <Button
              onPress={() => buttonStartRound()}
              style={[styles.button, {backgroundColor: colors.mainBlue}]}>
              <Text style={styles.buttonTextEnabled}>Comenzar Ronda</Text>
            </Button>
          ) : (
            <Button
              style={[styles.button, {backgroundColor: colors.backgroundGray}]}
              disabled>
              <Text style={styles.buttonTextDisabled}>Comenzar Ronda</Text>
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    startRound: state.rounds.startRound,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    start_round: id => {
      dispatch(roundsActions.startRound(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatedRound);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundGray,
  },
  title: {
    paddingHorizontal: 20,
    color: colors.gray,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  button: {
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 30,
    flex: 1,
    backgroundColor: colors.mainBlue,
    elevation: 0,
  },
  buttonTextEnabled: {
    color: '#ffffff',
  },
  buttonTextDisabled: {
    color: '#D8D8D8',
  },
});
