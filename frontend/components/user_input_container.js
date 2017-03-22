import { connect } from 'react-redux';
import UserInput from './user_input.jsx';
import { fetchTicks } from '../actions/mp_actions';

const mapDispatchToProps = dispatch => ({
  fetchTicks: (email) => dispatch(fetchTicks(email))
});

export default connect(null, mapDispatchToProps)(UserInput);
