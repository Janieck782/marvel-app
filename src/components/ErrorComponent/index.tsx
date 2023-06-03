import React, { FC } from 'react';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ message }) => {
  return <div>Error: {message}</div>;
};

export default ErrorComponent;