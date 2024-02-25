import React from 'react';

import Button from '../Button';
import Toast from '../Toast';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('');
  const [showToast, setShowToast] = React.useState(false);

  function handleShowToast() {
    if (!message && !variant) {
      throw new Error('need to provide message and variant type');
    };

    if (!VARIANT_OPTIONS.includes(variant)) {
      throw new Error('variants available are ["notice", "warning", "success", "error"]');
    };

    setShowToast(true);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <header>
          <img alt="Cute toast mascot" src="/toast.png" />
          <h1>Toast Playground</h1>
        </header>

        <div className={styles.controlsWrapper}>
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
              <Button onClick={handleShowToast}>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </div>
      
      {showToast && (
        <Toast variant={variant} onDismiss={(() => setShowToast(false))}>
          {message}
        </Toast>
      )}
    </>
  );
}

export default ToastPlayground;
