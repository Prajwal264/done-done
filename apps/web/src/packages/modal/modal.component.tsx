import React from 'react';
import { createPortal } from 'react-dom';
import ModalWrapper from './modal-wrapper.component';

const modalRoot = document.getElementById('donedonemodal');

interface IProps {
  showBackdrop: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

class Modal extends React.Component<IProps> {
  element: HTMLDivElement;

  constructor(props: IProps) {
    super(props);
    this.element = document.createElement('div');
  }
  componentDidMount() {
    if (modalRoot) {
      modalRoot.appendChild(this.element);
    }
  }
  componentWillUnmount() {
    if (modalRoot) {
      modalRoot.removeChild(this.element);
    }
  }
  render() {
    return createPortal(
      ModalWrapper(this.props.children, {
        showBackdrop: this.props.showBackdrop,
        onClick: this.props.onClick,
      }),
      this.element,
    );
  }
}

export default Modal;
