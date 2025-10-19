import { useEffect } from 'react';

const Toast = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-success' : 'bg-danger';

  return (
    <div 
      className="position-fixed top-0 end-0 p-3" 
      style={{ zIndex: 9999, marginTop: '80px' }}
    >
      <div className={`toast show ${bgColor} text-white`} role="alert">
        <div className="toast-body d-flex align-items-center justify-content-between">
          <span>✓ {message}</span>
          <button 
            type="button" 
            className="btn-close btn-close-white ms-3" 
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div> 
  );
};

export default Toast;