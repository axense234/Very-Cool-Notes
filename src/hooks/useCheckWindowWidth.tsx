// React
import { useState, useEffect } from "react";

const useCheckWindowWidth = (nbPixels: number) => {
  const [changeLayout, setChangeLayout] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= nbPixels) {
        setChangeLayout(true);
      } else {
        setChangeLayout(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        // Do nothing
      });
    };
  }, []);
  return changeLayout;
};

export default useCheckWindowWidth;
