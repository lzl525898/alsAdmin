import {connect} from 'react-redux'
import Counter from '../components/Counter'
import {increment,decrement,incrementAsync} from '../reduce/actions'
const App = connect(
    state => ({count: state.count}),
    {increment, decrement,incrementAsync}
)(Counter)

export default App