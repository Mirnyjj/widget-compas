import SizeButton from '../../assets/button_size.svg';
import './index.css';
type Props = {
  title: string;
  onOpenWindow: () => void;
};

export const ButtonZoom = ({title, onOpenWindow}: Props) => {
  return (
    <div className='title_btn_wrapper'>
      <div className='wind-title'>{title}</div>
      <button className='button_sizes' onClick={onOpenWindow}>
        <img src={SizeButton} />
      </button>
    </div>
  );
};
