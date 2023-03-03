import { useState, useEffect } from "react";

const useIntersectionObserver = (callback) => {
  const [ref, setRef] = useState(null);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await callback();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref]);

  return setRef;
};

export default useIntersectionObserver;
