import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "@/utils/api";

import styles from "@/styles/Memo.module.scss";
import Button from "@/components/common/Button";
import MemoCard from "@/components/common/MemoCard";

const tagArr = [
  {
    title: "전체",
    category: "",
  },
  {
    title: "책 속 문장",
    category: "quote",
  },
  {
    title: "느낀점",
    category: "comment",
  },
];

const NoMemoList = ({ bookId, title }) => {
  const router = useRouter();
  return (
    <div className={styles.memo_empty}>
      <img src="/images/article.svg" alt="article" />
      <div className={styles.memo_empty_text}>아직 메모가 없어요</div>
      <button
        className={styles.btn_gotoMemo}
        onClick={() =>
          router.push({ pathname: "/record", query: { id: bookId, title } })
        }
      >
        메모하러 가기
      </button>
    </div>
  );
};

const Header = ({ moreHandler }) => {
  const router = useRouter();
  return (
    <div className={styles.btn_container}>
      <img
        src="/images/backButton.svg"
        alt="back"
        className={styles.btn}
        onClick={() => router.push("/library")}
      />
      <img
        src="/images/more.svg"
        alt="more"
        className={styles.btn}
        onClick={moreHandler}
      />
    </div>
  );
};

const Dropdown = ({
  isDropdownVisible,
  isReading,
  deleteHandler,
  completeHandler,
  cancelHandler,
}) => {
  if (isDropdownVisible) {
    return (
      <div className={styles.dropdown}>
        <div className={styles.dropdown_text_delete} onClick={deleteHandler}>
          <img src="/images/delete.svg" alt="delete" />
          <div>책 삭제하기</div>
        </div>
        {isReading ? (
          <div className={styles.dropdown_text} onClick={completeHandler}>
            <img src="/images/check_s.svg" alt="check_s" />
            <div>완독하기</div>
          </div>
        ) : (
          <div className={styles.dropdown_text} onClick={cancelHandler}>
            <img src="/images/reset.svg" alt="reset" />
            <div>완독 취소하기</div>
          </div>
        )}
      </div>
    );
  }
};

const ModalBook = ({ isModalBookVisible, cancelHandler, deleteHandler }) => {
  if (isModalBookVisible) {
    return (
      <div className={styles.modal_overlay}>
        <div className={styles.modal_big}>
          <div className={styles.modal_text_title}>책을 삭제할까요?</div>
          <div className={styles.modal_text_subtitle}>
            삭제한 책은 되돌릴 수 없어요
          </div>
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
              children={<div style={{ width: "70px" }}>삭제하기</div>}
              onClick={deleteHandler}
            />
          </div>
        </div>
      </div>
    );
  }
};

const BookInfo = ({ title, author, publisher, image }) => {
  return (
    <div className={styles.book_detail_container}>
      <div className={styles.book_info}>
        <div className={styles.book_title}>{title}</div>
        <div>
          <div className={styles.book_author}>
            <strong>저자</strong> {author}
          </div>
          <div className={styles.book_author}>
            <strong>출판</strong> {publisher}
          </div>
        </div>
      </div>
      <img src={image} alt="book_image" className={styles.book_img} />
    </div>
  );
};

function Memo() {
  const router = useRouter();
  const [bookDetail, setBookDetail] = useState([]);
  const [memoList, setMemoList] = useState([]);
  const [memoCount, setMemoCount] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [updatedAt, setUpdatedAt] = useState();
  const [activeTag, setActiveTag] = useState(0);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isModalBookVisible, setModalBookVisible] = useState(false);
  const [showPopUp, setShowPopUp] = useState(router.query.isEdited || false);
  const handleTagClick = (index) => setActiveTag(index);
  const handleDropdown = () => setDropdownVisible(!isDropdownVisible);
  const handleModalBook = () => setModalBookVisible(!isModalBookVisible);

  const completeBook = async () => {
    await Api.patch(`/books/${Number(router.asPath.substring(14))}`, {
      isReading: false,
    });
    router.push({ pathname: "/library", query: { activeTab: 1 } }, "/library");
  };

  const cancelCompleteBook = async () => {
    await Api.patch(`/books/${Number(router.asPath.substring(14))}`, {
      isReading: true,
    });
    router.push("/library");
  };

  const deleteBook = async () => {
    const res = await Api.delete(
      `/books/${Number(router.asPath.substring(14))}`,
    );
    if (res.status === 202) {
      router.back();
    }
  };

  const deleteMemo = async (memoId) => {
    const res = await Api.delete(`/memos/${memoId}`);
    if (res.status === 202) {
      router.reload();
    }
  };

  const getMemoList = async () => {
    const res = await Api.get(
      `/books/${Number(router.asPath.substring(14))}?category=${
        tagArr[activeTag].category
      }`,
    );
    setBookDetail(res.data);
    setMemoList(res.data.memos);
    setMemoCount(res.data.memoCount);
    setCreatedAt(res.data.CreatedAt.substring(0, 10));
    setUpdatedAt(res.data.UpdatedAt.substring(0, 10));
  };

  useEffect(() => {
    if (!router.isReady) return;
    getMemoList();
  }, [router.isReady, activeTag]);

  useEffect(() => {
    if (showPopUp) {
      setTimeout(() => setShowPopUp(false), 3000);
    }
  }, [showPopUp]);

  return (
    <div className={styles.container}>
      <Header moreHandler={handleDropdown} />
      <Dropdown
        isDropdownVisible={isDropdownVisible}
        deleteHandler={handleModalBook}
        isReading={bookDetail.isReading}
        completeHandler={completeBook}
        cancelHandler={cancelCompleteBook}
      />
      <ModalBook
        isModalBookVisible={isModalBookVisible}
        cancelHandler={() => {
          setModalBookVisible(false);
          setDropdownVisible(false);
        }}
        deleteHandler={deleteBook}
      />
      <BookInfo
        title={bookDetail.title}
        author={bookDetail.author}
        publisher={bookDetail.publisher}
        image={bookDetail.image}
      />
      <div className={styles.division}></div>
      <div className={styles.record_date_container}>
        <div className={styles.subtitle}>독서 기록</div>
        {!bookDetail.isReading && (
          <div className={styles.record_complete}>🎉완독했어요!🎉</div>
        )}
        <div className={styles.date_container}>
          <div className={styles.date_title}>시작한 날짜</div>
          <div className={styles.date}>{createdAt}</div>
        </div>
        {memoCount !== 0 && (
          <div className={styles.date_container}>
            <div className={styles.date_title}>마지막 날짜</div>
            <div className={styles.date}>{updatedAt}</div>
          </div>
        )}
      </div>
      <div className={styles.division}></div>
      <div>
        <div className={styles.subtitle_memo}>메모</div>
        {bookDetail.memoCount === 0 ? (
          <NoMemoList bookId={bookDetail.ID} title={bookDetail.title} />
        ) : (
          <div>
            <div className={styles.tag_container}>
              {tagArr.map((tag, index) => (
                <div
                  key={index}
                  onClick={() => handleTagClick(index)}
                  className={
                    activeTag === index
                      ? styles.tag_btn_selected
                      : styles.tag_btn_deSelected
                  }
                >
                  {tag.title}
                </div>
              ))}
            </div>
            <div className={styles.memo_list_count}>{memoList.length}개</div>
            {memoList
              .slice(0)
              .reverse()
              .map((memo) => (
                <MemoCard
                  key={memo.ID}
                  memo={memo}
                  handleEditClick={() =>
                    router.push(
                      {
                        pathname: "/record",
                        query: {
                          bookId: bookDetail.ID,
                          id: memo.ID,
                          isEditPage: true,
                          memoText: memo.text,
                          memoTag: memo.category,
                        },
                      },
                      `/edit?memoId=${memo.ID}`,
                    )
                  }
                  handleDeleteClick={() => deleteMemo(memo.ID)}
                />
              ))}
          </div>
        )}
      </div>
      {showPopUp && <div className={styles.popUp}>메모가 수정되었어요.</div>}
    </div>
  );
}

export default Memo;
