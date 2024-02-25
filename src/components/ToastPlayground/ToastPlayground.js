import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('');
  const [toasts, setToasts] = React.useState([]);

  function handleShowToast() {
    if (!message && !variant) {
      throw new Error('need to provide message and variant type');
    };

    if (!VARIANT_OPTIONS.includes(variant)) {
      throw new Error('variants available are ["notice", "warning", "success", "error"]');
    };

    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];
    
    setToasts(nextToasts);
  }

  function handleDismissToast(toastId) {
    const nextToasts = toasts.filter(toast => toast.id !== toastId);
    setToasts(nextToasts);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <header>
          <img alt="Cute toast mascot" src="/toast.png" />
          <h1>Toast Playground</h1>
        </header>

        <form 
          className={styles.controlsWrapper}
          onSubmit={e => {
            e.preventDefault();
            handleShowToast();
          }}
        >
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea 
                id="message" 
                className={styles.messageInput}
                value={message}
                onChange={e => setMessage(e.target.value)} 
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              {VARIANT_OPTIONS.map(option => {
                const id = `variant-${option}`;

                return (
                  <label key={option} htmlFor={id}>
                    <input
                      id={id}
                      type="radio"
                      name="variant"
                      value={option}
                      checked={variant === option}
                      onChange={e => setVariant(e.target.value)}
                    />
                    {option}
                  </label>
                )
              })}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </form>
      </div>
      
      <ToastShelf 
        toasts={toasts} 
        onDismiss={toastId => handleDismissToast(toastId)}
      />
    </>
  );
}

export default ToastPlayground;
