import { useEffect, useRef, useState } from "react";

import styles from "@/styles/component/MemoCard.module.scss";
import Button from "./Button";

function MemoCard({ memo, handleClick }) {
  const { id, category, text, UpdatedAt } = memo;
  const [isOptionVisible, setOptionVisible] = useState(false);
  const [isModalMemoVisible, setModalMemoVisible] = useState(false);
  const outsideRef = useRef(null);
  const handleOption = () => setOptionVisible(!isOptionVisible);
  const handleModalMemo = () => setModalMemoVisible(true);
  const handleClickOutside = (event) => {
    if (outsideRef.current && !outsideRef.current.contains(event.target)) {
      setOptionVisible(false);
    }
  };
  useEffect(() => {
    if (isOptionVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outsideRef, isOptionVisible]);

  return (
    <div>
      {isModalMemoVisible ? (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_big}>
            <div className={styles.modal_text_title}>메모를 삭제할까요?</div>
            <div className={styles.modal_text_subtitle}>
              삭제한 메모는 되돌릴 수 없어요
            </div>
            <div className={styles.modal_btn_container}>
              <Button
                backgroundColor="#E8EAEE"
                color="#3D4350"
                radius="12px"
                padding="12px 24px"
                fontSize="16px"
                children={<div style={{ width: "70px" }}>취소</div>}
                onClick={() => {
                  setModalMemoVisible(false);
                }}
              />
              <Button
                backgroundColor="#CF3644"
                color="#FFFFFF"
                radius="12px"
                padding="12px 24px"
                fontSize="16px"
                children={<div style={{ width: "70px" }}>삭제하기</div>}
              />
            </div>
          </div>
        </div>
      ) : null}
      <div key={id} className={styles.memo_container}>
        <div className={styles.memo_topbar}>
          <div className={styles.memo_category}>
            #{category === "quote" ? "책 속 문장" : "느낀점"}
          </div>
          <div className={styles.dropdown_container} ref={outsideRef}>
            <img
              src="/images/more.svg"
              alt="option"
              onClick={handleOption}
              className={styles.option}
            />
            {isOptionVisible ? (
              <div className={styles.dropdown}>
                <div className={styles.option_edit} onClick={handleClick}>
                  <img src="/images/edit.svg" alt="edit" />
                  <div>메모 수정하기</div>
                </div>
                <div className={styles.option_delete} onClick={handleModalMemo}>
                  <img src="/images/delete.svg" alt="delete" />
                  <div>메모 삭제하기</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.memo_text}>{text}</div>
        <div className={styles.memo_updatedAt}>{UpdatedAt}</div>
      </div>
    </div>
  );
}
export default MemoCard;
