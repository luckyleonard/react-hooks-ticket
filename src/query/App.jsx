import React from 'react';
import { connect } from 'react-redux';
import Nav from '../common/Nav';
import List from './List';
import Bottom from './Bottom';
import './App.css';

function App(props) {
  return (
    <>
      <Nav />
      <List />
      <Bottom />
    </>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);
