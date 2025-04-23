import {ResizeMode} from '../../models';
import './index.css';

export const ResizeHandle = ({
  handleResizeStart,
}: {
  handleResizeStart: (e: React.MouseEvent, mode: ResizeMode) => void;
}) => {
  return (
    <>
      <div
        className='resize-handle resize-n'
        onMouseDown={e => handleResizeStart(e, 'n')}
      />
      <div
        className='resize-handle resize-e'
        onMouseDown={e => handleResizeStart(e, 'e')}
      />
      <div
        className='resize-handle resize-s'
        onMouseDown={e => handleResizeStart(e, 's')}
      />
      <div
        className='resize-handle resize-w'
        onMouseDown={e => handleResizeStart(e, 'w')}
      />
      <div
        className='resize-handle resize-ne'
        onMouseDown={e => handleResizeStart(e, 'ne')}
      />
      <div
        className='resize-handle resize-nw'
        onMouseDown={e => handleResizeStart(e, 'nw')}
      />
      <div
        className='resize-handle resize-se'
        onMouseDown={e => handleResizeStart(e, 'se')}
      />
      <div
        className='resize-handle resize-sw'
        onMouseDown={e => handleResizeStart(e, 'sw')}
      />
    </>
  );
};
