import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';
import { ToastContext, VARIANT_OPTIONS } from '../ToastProvider';

import styles from './ToastPlayground.module.css';

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('');
  const { createToast } = React.useContext(ToastContext);

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
            createToast({ message, variant });
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
      
      <ToastShelf />
    </>
  );
}

export default ToastPlayground;
