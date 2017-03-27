import { connect } from 'react-redux';
import Visual from './visual';

const mapStateToProps = ({ ticks, loading}) => {
  return (
    {
      ticks: ticks,
      loading: loading
    }
  );
};

export default connect(mapStateToProps)(Visual);
