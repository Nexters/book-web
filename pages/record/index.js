import { useState, useRef } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import styles from "@/styles/Record.module.scss";

const tags = ["#구절", "#느낀점"];

const Header = ({ title, goBackHandler, isEdit, isDisable }) => {
  return (
    <div className={styles.header_container}>
      <button>
        <img src="/images/backButton.svg" alt="back" onClick={goBackHandler} />
      </button>
      <h6 className={styles.header_title}>{isEdit ? "메모 수정" : title}</h6>
      {isEdit ? (
        <button
          //onClick={}
          className={cn(
            styles.boldText,
            styles.header_button_edit,
            isDisable && styles.header_button_disable,
          )}
          disabled={isDisable}
        >
          저장하기
        </button>
      ) : (
        <button
          //onClick={}
          className={cn(styles.boldText, styles.header_button)}
        >
          완독
        </button>
      )}
    </div>
  );
};

const TextArea = ({ text, setText, setFocus }) => {
  const textArea = useRef();
  const isInValid = text.length > 150;

  const handleResizeHeight = (e) => {
    setText(e.target.value);
    textArea.current.style.height = "auto";
    textArea.current.style.height = textArea.current.scrollHeight + "px";
  };

  return (
    <div className={styles.textArea_container}>
      <textarea
        rows={5}
        placeholder="메모를 입력해주세요"
        value={text}
        ref={textArea}
        onChange={handleResizeHeight}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={styles.textArea_text}
      />
      <div
        className={cn(
          "d-flex flex-row-reverse justify-content-between mt-3",
          isInValid && styles.warnText,
        )}
      >
        <p className="mb-0">{`${text.length} / 150`}</p>
        {isInValid && <p className="mb-0">150자 이하로 써주세요</p>}
      </div>
    </div>
  );
};

const Tags = ({ tag, setTag }) => {
  return (
    <div className={styles.tags_container}>
      <h6 className={styles.tags_title}>태그를 입력해주세요</h6>
      <div className="d-flex">
        {tags.map((item) => (
          <div
            className={cn(
              styles.tags_keyword,
              item === tag && styles.tags_selected,
            )}
            onClick={() => setTag(item)}
          >
            {item}
          </div>
        ))}
      </div>
      {tag.length === 0 && (
        <p className={cn(styles.tags_warn, styles.warnText)}>
          메모 저장하기 전 태그를 입력해주세요!
        </p>
      )}
    </div>
  );
};

function Record() {
  const router = useRouter();
  const { id, title, memoText, memoTag, isEditPage } = router.query;
  const [text, setText] = useState(memoText || "");
  const [tag, setTag] = useState(memoTag || "");
  const [focus, setFocus] = useState(false);

  const [showPopUp, setShowPopUp] = useState(false);

  const isDisable = text.length > 150 || tag.length == 0;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleSave = () => {
    setShowPopUp(true);
    setText("");
    setTag("");
    setTimeout(() => setShowPopUp(false), 3000);
  };

  const handleEditSave = () => {
    router.push({
      pathname: `memo/${id}`,
      query: { isEdited: isEdited },
    });
  };

  //NOTE: /record로 바로 접근 시 제목 데이터 가져올 수 없으므로 접근 제한이 필요할 듯 함.
  return (
    <div style={{ height: "100vh" }}>
      <Header
        title={title}
        goBackHandler={() => router.back()}
        isEdit={isEditPage}
        isDisable={isDisable}
      />
      <TextArea text={text} setText={setText} setFocus={setFocus} />
      <div className={styles.division}></div>
      <Tags tag={tag} setTag={setTag} />
      <div
        className={cn(styles.bottom, isMobile && focus && styles.bottom_focus)}
      >
        {showPopUp && <div className={styles.popUp}>메모가 저장되었어요.</div>}
        <button
          className={cn(styles.saveButton, isDisable && styles.disableButton)}
          disabled={isDisable}
          onClick={isEditPage ? handleEditSave : handleSave}
        >
          메모 저장하기
        </button>
      </div>
    </div>
  );
}

export default Record;
