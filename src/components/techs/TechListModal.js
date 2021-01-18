import React, { useEffect, useState } from 'react';
import TechItem from './TechItem';


const TechListModal = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-undef
  useEffect(() => {
    getTechs();

  }, []);

  const getTechs = async () => {
    setLoading(true);
    const res = await fetch('/techs');
    const data = await res.json();

    setTechs(data);
    setLoading(false);
  };

  
  return (
    <div id="tech-list-modal" className="modal">
      <div className='modal-content'>
        <h4>Schrijvers Lijst</h4>
        <ul className='collection'>
          {!loading && 
            techs.map(tech => (
              <TechItem tech={tech} key={tech.id} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TechListModal;
