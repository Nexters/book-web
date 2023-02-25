import Button from "./Button";
import styles from "@/styles/component/Modal.module.scss";

const Modal = ({
  title,
  subtitle,
  confirmMessage,
  cancelHandler,
  confirmHandler,
}) => (
  <div className={styles.modal_overlay}>
    <div className={styles.modal_big}>
      <div className={styles.modal_text_title}>{title}</div>
      <div className={styles.modal_text_subtitle}>{subtitle}</div>
      <div className={styles.modal_btn_container}>
        <Button
          backgroundColor="#E8EAEE"
          color="#3D4350"
          radius="12px"
          padding="12px 24px"
          fontSize="16px"
          children={<div style={{ width: "70px" }}>취소</div>}
          onClick={cancelHandler}
        />
        <Button
          backgroundColor="#CF3644"
          color="#FFFFFF"
          radius="12px"
          padding="12px 24px"
          fontSize="16px"
          children={<div style={{ width: "70px" }}>{confirmMessage}</div>}
          onClick={confirmHandler}
        />
      </div>
    </div>
  </div>
);

export default Modal;
