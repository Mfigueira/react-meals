import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const Backdrop = ({ onHideModal }) => (
  <div className={classes.backdrop} onClick={onHideModal}></div>
);

const ModalOverlay = ({ children }) => (
  <div className={classes.modal}>
    <div className={classes.content}>{children}</div>
  </div>
);

export const Modal = ({ onHideModal, children }) =>
  ReactDOM.createPortal(
    <>
      <Backdrop onHideModal={onHideModal} />
      <ModalOverlay>{children}</ModalOverlay>
    </>,
    document.getElementById('overlays')
  );
