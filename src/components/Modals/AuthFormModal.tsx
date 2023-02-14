// SCSS
import "../../scss/components/Modals/AuthFormModal.scss";
// React Icons
import { GoTriangleDown } from "react-icons/go";
// React
import { useRef } from "react";
// Hooks
import useModalTransition from "../../hooks/useModalTransition";

interface AuthFormModalProps {
  msg: string;
  show: boolean;
}

const AuthFormModal: React.FC<AuthFormModalProps> = ({ msg, show }) => {
  const authModalRef = useRef<HTMLDivElement>(null);

  useModalTransition(authModalRef, show);

  return (
    <div className='authform-modal-container' ref={authModalRef}>
      <p>{msg}</p>
      <GoTriangleDown />
    </div>
  );
};

export default AuthFormModal;
