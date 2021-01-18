import React, { useEffect, useState } from 'react';
import Preloader from '../layout/Preloader';
import LogItem from './LogItem';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-undef
  useEffect(() => {
    getLogs();

  }, []);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch('/logs');
    const data = await res.json();

    setLogs(data);
    setLoading(false);
  }

  if(loading) {
    return <Preloader />
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

export default Logs;
