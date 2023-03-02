import { useState, useRef } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import styles from "@/styles/Record.module.scss";
import { Api } from "@/utils/api";
import Modal from "@/components/common/Modal";

const tags = [
  { kor: "책 속 문장", eng: "quote" },
  { kor: "느낀점", eng: "comment" },
];

const Header = ({ title, goBackHandler, isEdit, isDisable, handleClick }) => {
  return (
    <div className={styles.header_container}>
      <button>
        <img src="/images/backButton.svg" alt="back" onClick={goBackHandler} />
      </button>
      <h6 className={styles.header_title}>{isEdit ? "메모 수정" : title}</h6>
      {isEdit ? (
        <button
          onClick={handleClick}
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
          onClick={handleClick}
          className={cn(styles.boldText, styles.header_button)}
        >
          완독
        </button>
      )}
    </div>
  );
};

const TextArea = ({ text, setText }) => {
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
            key={item.eng}
            className={cn(
              styles.tags_keyword,
              item.eng === tag && styles.tags_selected,
            )}
            onClick={() => setTag(item.eng)}
          >
            {item.kor}
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

  const { bookId, id, title, memoText, memoTag, isEditPage } = router.query;
  const [text, setText] = useState(memoText || "");
  const [category, setCategory] = useState(memoTag || "");
  const [showPopUp, setShowPopUp] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showFinishModal = () => setIsModalVisible(true);
  const closeFinishModal = () => setIsModalVisible(false);

  const isDisable =
    text.length === 0 || text.length > 150 || category.length == 0;

  const postMemo = async () => {
    await Api.post(`/memos`, {
      bookId: Number(id),
      category,
      text,
    });
  };

  const finishReading = async () => {
    await Api.patch(`/books/${id}`, {
      isReading: false,
    });
    router.push({ pathname: "/library", query: { activeTab: 1 } }, "/library");
  };

  const handleSave = () => {
    postMemo();
    setShowPopUp(true);
    setText("");
    setCategory("");
    setTimeout(() => setShowPopUp(false), 3000);
  };

  const handleEditSave = async () => {
    await Api.patch(`/memos/${id}`, {
      category,
      text,
    });
    router.push(
      {
        pathname: `/library/memo/${bookId}`,
        query: { isEdited: true },
      },
      `/library/memo/${bookId}`,
    );
  };

  //NOTE: /record로 바로 접근 시 제목 데이터 가져올 수 없으므로 접근 제한이 필요할 듯 함.
  return (
    <div className={styles.record_container}>
      {showPopUp && <div className={styles.popUp}>메모가 저장되었어요.</div>}
      <Header
        title={title}
        goBackHandler={() => router.back()}
        isEdit={isEditPage}
        isDisable={isDisable}
        handleClick={isEditPage ? handleEditSave : showFinishModal}
      />
      <TextArea text={text} setText={setText} />
      <div className={styles.division}></div>
      <Tags tag={category} setTag={setCategory} />
      <div className={styles.bottom}>
        {!isEditPage && (
          <button
            className={cn(styles.saveButton, isDisable && styles.disableButton)}
            disabled={isDisable}
            onClick={handleSave}
          >
            메모 저장하기
          </button>
        )}
      </div>
      {isModalVisible && (
        <Modal
          title="책을 다 읽었나요?"
          subtitle="잘못눌러도 괜찮아요. 내 서재 탭에서 되돌릴 수 있어요."
          confirmMessage="완독하기"
          cancelHandler={closeFinishModal}
          confirmHandler={finishReading}
          isConfirmModal
        />
      )}
    </div>
  );
}

export default Record;
