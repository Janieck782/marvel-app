
import React, { FC } from 'react';

interface LoadingComponentProps {
  message: string;
}

const LoadingComponent: FC<LoadingComponentProps> = ({ message }) => {
  return <div>Loading: {message}</div>;
};

export default LoadingComponent;