import { connect } from 'react-redux';
import Visual from './visual';

const mapStateToProps = ({routes, ticks, loading}) => {
  return (
    {
      ticks: ticks,
      routes: routes,
      loading: loading
    }
  );
};

export default connect(mapStateToProps)(Visual);
