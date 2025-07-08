import React from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from '../assets/loader.json';
import { useLoader } from './LoaderContext';

const LoaderOverlay = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-[9999] flex items-center justify-center">
      <Lottie animationData={loaderAnimation} loop={true} style={{ width: 200, height: 200 }} />
    </div>
  );
};

export default LoaderOverlay;
