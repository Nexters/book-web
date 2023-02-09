import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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

const NoMemoList = () => {
  const router = useRouter();
  return (
    <div className={styles.memo_empty}>
      <img src="/images/article.svg" alt="article" />
      <div className={styles.memo_empty_text}>아직 메모가 없어요</div>
      <Button
        backgroundColor="#17171B"
        color="white"
        radius="12px"
        padding="12px 24px"
        children="메모하러 가기"
        onClick={() => router.push("/record")}
      />
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
        onClick={() => router.back()}
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

const ModalSmall = ({ isModalSmallVisible, clickHandler }) => {
  if (isModalSmallVisible) {
    return (
      <div className={styles.modal_small} onClick={clickHandler}>
        <img src="/images/delete.svg" alt="delete" />
        <div>책 삭제하기</div>
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
  const [activeTag, setActiveTag] = useState(0);
  const [isModalSmallVisible, setModalSmallVisible] = useState(false);
  const [isModalBookVisible, setModalBookVisible] = useState(false);
  const [showPopUp, setShowPopUp] = useState(router.query.isEdited || false);
  const handleTagClick = (index) => setActiveTag(index);
  const handleModalSmall = () => setModalSmallVisible(!isModalSmallVisible);
  const handleModalBook = () => setModalBookVisible(!isModalBookVisible);

  const deleteBook = async () => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/books/${router.query.bookId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    if (res.status === 202) {
      router.back();
    }
  };

  const getMemoList = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/books/${router.query.bookId}?category=${tagArr[activeTag].category}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    setBookDetail(res.data);
    setMemoList(res.data.memos);
  };

  useEffect(() => {
    getMemoList();
  }, [activeTag]);

  useEffect(() => {
    if (showPopUp) {
      setTimeout(() => setShowPopUp(false), 3000);
    }
  }, [showPopUp]);

  return (
    <div className={styles.container}>
      <Header moreHandler={handleModalSmall} />
      <ModalSmall
        isModalSmallVisible={isModalSmallVisible}
        clickHandler={handleModalBook}
      />
      <ModalBook
        isModalBookVisible={isModalBookVisible}
        cancelHandler={() => {
          setModalBookVisible(false);
          setModalSmallVisible(false);
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
          <div className={styles.date}>{bookDetail.CreatedAt}</div>
        </div>
        {memoList.length !== 0 && (
          <div className={styles.date_container}>
            <div className={styles.date_title}>마지막 날짜</div>
            <div className={styles.date}>{bookDetail.UpdatedAt}</div>
          </div>
        )}
      </div>
      <div className={styles.division}></div>
      <div>
        <div className={styles.subtitle_memo}>메모</div>
        {bookDetail.memoCount === 0 ? (
          <NoMemoList />
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
            {memoList.map((memo) => (
              <MemoCard
                key={memo.ID}
                memo={memo}
                handleClick={() =>
                  router.push(
                    {
                      pathname: "/record",
                      query: {
                        id: memo.ID,
                        isEditPage: true,
                        memoText: memo.text,
                        memoTag: memo.category,
                      },
                    },
                    `/edit?memoId=${memo.ID}`,
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
      {showPopUp && (
        <div className={styles.bottom}>
          <div className={styles.popUp}>메모가 수정되었어요.</div>
        </div>
      )}
    </div>
  );
}

export default Memo;
