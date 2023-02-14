// React
import { useEffect } from "react";

const useModalTransition = (
  modalRef: React.RefObject<HTMLDivElement>,
  show: boolean
) => {
  useEffect(() => {
    const modal = modalRef.current as HTMLDivElement;
    let timeout: NodeJS.Timeout;

    if (show) {
      modal.style.display = "flex";
      timeout = setTimeout(() => {
        modal.style.opacity = "1";
      });
    } else {
      modal.style.opacity = "0";
      timeout = setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
};

export default useModalTransition;
