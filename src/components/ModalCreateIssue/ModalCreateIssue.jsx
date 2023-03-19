import React, { Children, useState } from "react";
import styles from './styles.module.scss'
const ModalCreateIssue = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add(styles.active-modal);
  } else {
    document.body.classList.remove(styles.active-modal);
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles.modalContent}>
            <h2>Hello Modal</h2>
            
             {Children}
            
            <button className={styles.close-modal} onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      
    </>
  );
};

export default ModalCreateIssue;
