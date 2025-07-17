/** @jsxRuntime classic */
import * as React from 'react';
import Modal from './Modal.js';

const NotificationContext = React.createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = React.useState({
    isOpen: false,
    message: '',
    type: 'success',
    title: ''
  });

  const showNotification = React.useCallback((message, type, title) => {
    setNotification({
      isOpen: true,
      message,
      type,
      title: title || (type === 'success' ? 'Éxito' : 'Error')
    });
  }, []);

  const hideNotification = () => {
    setNotification({ ...notification, isOpen: false });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Modal
        isOpen={notification.isOpen}
        onClose={hideNotification}
        title={notification.title}
        type={notification.type}
      >
        {notification.message}
      </Modal>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};