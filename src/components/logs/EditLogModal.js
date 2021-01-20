import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLog } from '../../actions/logActions';

const EditLogModal = ({ current, updateLog }) => {

  const[message, setMessage] = useState('');
  const[attention, setAttention] = useState(false);
  const[tech, setTech] = useState('');

  useEffect(() => {
    if(current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);
  
  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'aub voer een boodschap en overzicht in' });
    } else {
      const updLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date()
      }

      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech}` });

      // Clear Filds
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
  <div id='edit-log-modal' className="modal" style={modalStyle}>

    <div className="modal-content">
      <h4>Voer systeemlog in</h4>
      <div className='row'>
        <div className='input-field'>
          <input 
            type='text'
            name='message'
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          
        </div>
      </div>
      <div className="row">
        <div className="input-field">
          <select 
            name="tech" 
            value={tech} 
            className="browser-default"
            onChange={e => setTech(e.target.value)}
            >
              <option valie='' disabled>
                Kies de Technicus
              </option>
              <option value="Hoche Kleber">Hoche Kleber</option>
              <option value="Saint Simon">Saint Simon</option>
              <option value="John DeNerval">John DeNerval</option>
            </select>
        </div>

      </div>
      <div className="row">
        <div className="input-field">
          <p>
            <label>
              <input 
              type='checkbox'
              className='filled-in'
              checked={attention}
              value={attention}
              onChange={e => setAttention(!attention)}
              />
              <span>Aandacht nodig</span>
            </label>
          </p>
        </div>
      </div>
    </div>
    <div className="modal-footer">
      <a 
        href='#!'
        onClick={onSubmit}
        className='modal-close waves-effect yellow waves-light btn'
        >Invoeren</a>
    </div>
  </div>

  );
};
const modalStyle = {
  width: '75%',
  height: '75%'
};
EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  current: state.log.current
})

export default connect(mapStateToProps, {updateLog })(EditLogModal);
