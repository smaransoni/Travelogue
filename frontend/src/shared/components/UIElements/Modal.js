import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop.js';
import './Modal.css';

// const ModalOverlay = props => {
const ModalOverlay = React.forwardRef((props, ref) => {
  const content = (
    <div className={`modal ${props.className}`} ref={ref} style={props.style}>
      {/* Omitted style={`${props.style}` from above div*/}
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSumbit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className={`model__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
});

const Modal = props => {
  const nodeRef = useRef(null);
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} ref={nodeRef} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
