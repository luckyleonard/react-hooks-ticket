import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit';

function App(props) {
  const onBack = useCallback(() => {
    window.history.back();
  }, []); // Prevent meaningless rerender
  return (
    <div>
      <Header title='Ticket System' onBack={onBack}></Header>
      <DepartDate></DepartDate>
      <HighSpeed></HighSpeed>
      <Journey></Journey>
      <Submit></Submit>
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {},
  function mapDispatchToProps(dispatch) {}
)(App);
