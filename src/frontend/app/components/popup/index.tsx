import './index.scss';
import ReactPortal from '../reactPortal';
import { ReactNode } from 'react';
type _POPUP_PROPS = {
  onClose?: () => void;
  onSubmit?: () => void;
  title: string | ReactNode;
  type?: 'success' | 'error';
  submit?: string;
  content?: string | ReactNode;
  footer?: ReactNode;
  popup_zindex?: {
    overlay: number;
    modal: number;
  };
};

const Popup = ({
  title,
  content,
  type,
  onClose,
  onSubmit,
  submit,
  footer,
  popup_zindex,
}: _POPUP_PROPS) => {
  return (
    <ReactPortal>
      <div
        className='popup-overlay'
        style={{ zIndex: popup_zindex?.overlay ?? 1000 }}
      />
      <div
        className='popup-modal'
        style={{ zIndex: popup_zindex?.modal ?? 2000 }}
      >
        <div className='popup-title'>
          {typeof title === 'string' ? (
            <span>{title}</span>
          ) : (
            <div>{title}</div>
          )}
          {onClose && (
            <button type='button' className='modal-btn' onClick={onClose}>
              <svg
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='3'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          )}
        </div>
        {content && <div className='popup-body'>{content}</div>}
        <div className='popup-footer'>
          {onSubmit && (
            <button
              className='modal-btn'
              style={
                type && {
                  backgroundColor: type === 'success' ? 'green' : 'red',
                }
              }
              onClick={onSubmit}
            >
              {submit ?? 'Okay'}
            </button>
          )}
          <div>{footer}</div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default Popup;
