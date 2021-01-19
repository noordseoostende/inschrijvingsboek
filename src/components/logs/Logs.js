import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';
import LogItem from './LogItem';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {
  

  // eslint-disable-next-line no-undef
  useEffect(() => {
    getLogs();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  if(loading || logs === null) {
    return <Preloader />;
  }
  return (
  <ul className="collection with-header">
    <li className="collection-header">
      <h4 className="center">systeemlogboek</h4>
    </li>
    {!loading && logs.length === 0 ? (
      <p className='center'>geen logs om te tonen...</p>
    ) : (
      logs.map(log => <LogItem log={log} key={log.id} />)
    )}

  </ul>
  );
};

Logs.propTypes = {
  // eslint-disable-next-line no-undef
  log: PropTypes.object.isRequired,
  // eslint-disable-next-line no-undef
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, { getLogs })(Logs);
