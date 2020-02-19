import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

function App(props) {
  const onBack = useCallback(() => {
    window.history.back();
  }, []); // Prevent meaningless rerender
  return (
    <div>
      <div className='header-wrapper'>
        <Header title='Ticket System' onBack={onBack} />
      </div>

      <DepartDate></DepartDate>
      <HighSpeed></HighSpeed>
      <Journey></Journey>
      <Submit></Submit>
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return {};
  },
  function mapDispatchToProps(dispatch) {
    return {};
  }
)(App);
