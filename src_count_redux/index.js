/*
入口js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './reduce/store';

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

store.subscribe(()=>{
    // console.log('store内部发生改变')
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
})