import React from 'react';
import Vector from '../img/Vector.svg';
import Vector_full from '../img/Vector-full.svg';

interface TitleProps {
  timestamp: number | null;
  id_room: number;
}

export const Title: React.FC<TitleProps> = ({ timestamp, id_room }) => {
  const allarmClass = timestamp ? 'allarm_notactive' : 'allarm_active';

  return (
    <div className="mips_title">
      <p className="mips_title_address">Кабинет, {id_room}</p>
      <div className="mips_title_info">
        <div className={`mips_title_lighting ${allarmClass}`}></div>
        <div className="mips_title_connection">
          <img src={timestamp ? Vector_full : Vector} alt="connection-icon" />
        </div>
      </div>
    </div>
  );
};
