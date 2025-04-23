import './index.css';

export const Lines = ({currentDirection}: {currentDirection: number}) => {
  return (
    <div className='wrapper_line'>
      <div className='line vertical_direction_line' />
      <div className='line horizontal_direction_line' />
      <div className='line intermediate_lines line_1' />
      <div className='line intermediate_lines line_2' />
      <div className='line intermediate_lines line_3' />
      <div className='line intermediate_lines line_4' />
      <div className='line intermediate_lines line_5' />
      <div className='line intermediate_lines line_6' />
      <div
        className='line_active'
        style={{
          transform: `translateX(-50%) rotate(${-currentDirection - 90}deg)`,
          transformOrigin: 'center top',
        }}
      />
    </div>
  );
};
