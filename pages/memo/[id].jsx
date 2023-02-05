import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Memo.module.scss";
import Button from "@/components/common/Button";
import MemoCard from "@/components/common/MemoCard";

// 더미 데이터
const bookDetail = {
  title:
    "NestJS로 배우는 백엔드 프로그래밍 (타입스크립트 환경의 차세대 서버 프레임워크를 만나다)",
  author: "한용재",
  link: "https://search.shopping.naver.com/book/catalog/36250090622",
  image:
    "https://shopping-phinf.pstatic.net/main_3625009/36250090622.20221213164928.jpg",
  discount: "24300",
  publisher: "제이펍",
  isbn: "9791192469560",
  pubdate: "20221220",
  description:
    "가장 진보한 프레임워크로 우아하게 백엔드 입문하기\n\nNestJS는 Express를 기반으로 DB, ORM, 유효성 검사 등의 라이브러리를 내장한 차세대 백엔드 프레임워크다. 제어 반전, 의존성 주입, AOP 등 객체 지향 개념을 도입했고 타입스크립트로 모듈/컴포넌트 기반의 프로그래밍을 할 수 있다. 이 책은 저자가 모두싸인에 몸담으며 익힌 노하우와 인사이트를 바탕으로 NestJS를 활용해 회원 가입, 이메일 인증, 로그인, 회원 정보 조회 기능을 갖춘 REST API 유저 서비스를 만들어본다. 프로젝트에 점차 살을 붙여나가며 백엔드 개발에 필요한 환경 변수 설정, 요청 유효성 검사, 인증(JWT), 로깅, 헬스 체크, CQRS, 클린 아키텍처, 단위 테스트 등 지식과 기술을 제대로 익힐 수 있게 집필했다.",
  memo: 15,
};

const memoList = [
  {
    bookId: 0,
    category: "느낀점",
    createdAt: "string",
    deletedAt: {
      time: "string",
      valid: true,
    },
    id: 0,
    text: "Lorem ipsum dolor sit amet consectetur. Phasellus nec dui dolor mattis malesuada. Tortor justo platea cursus amet mi magnis id. At nisi sed sed eros risus. Quam amet viverra duis ultricies adipiscing neque maecenas donec.",
    updatedAt: "string",
    userId: 0,
  },
  {
    bookId: 0,
    category: "배운점",
    createdAt: "string",
    deletedAt: {
      time: "string",
      valid: true,
    },
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur. Phasellus nec dui dolor mattis malesuada. Tortor justo platea cursus amet mi magnis id. At nisi sed sed eros risus. Quam amet viverra duis ultricies adipiscing neque maecenas donec.",
    updatedAt: "string",
    userId: 0,
  },
  {
    bookId: 0,
    category: "구절",
    createdAt: "string",
    deletedAt: {
      time: "string",
      valid: true,
    },
    id: 2,
    text: "Lorem ipsum dolor sit amet consectetur. Phasellus nec dui dolor mattis malesuada. Tortor justo platea cursus amet mi magnis id. At nisi sed sed eros risus. Quam amet viverra duis ultricies adipiscing neque maecenas donec.",
    updatedAt: "string",
    userId: 0,
  },
  {
    bookId: 0,
    category: "구절",
    createdAt: "string",
    deletedAt: {
      time: "string",
      valid: true,
    },
    id: 3,
    text: "Lorem ipsum dolor sit amet consectetur. Phasellus nec dui dolor mattis malesuada. Tortor justo platea cursus amet mi magnis id. At nisi sed sed eros risus. Quam amet viverra duis ultricies adipiscing neque maecenas donec.",
    updatedAt: "string",
    userId: 0,
  },
  {
    bookId: 0,
    category: "구절",
    createdAt: "string",
    deletedAt: {
      time: "string",
      valid: true,
    },
    id: 4,
    text: "Lorem ipsum dolor sit amet consectetur. Phasellus nec dui dolor mattis malesuada. Tortor justo platea cursus amet mi magnis id. At nisi sed sed eros risus. Quam amet viverra duis ultricies adipiscing neque maecenas donec.",
    updatedAt: "string",
    userId: 0,
  },
  {
    bookId: 0,
    category: "구절",
    createdAt: "string",
    deletedAt: {
      time: "string",
      valid: true,
    },
    id: 5,
    text: "Lorem ipsum dolor sit amet consectetur. Phasellus nec dui dolor mattis malesuada. Tortor justo platea cursus amet mi magnis id. At nisi sed sed eros risus. Quam amet viverra duis ultricies adipiscing neque maecenas donec.",
    updatedAt: "string",
    userId: 0,
  },
];

const tagArr = ["전체", "느낀점", "배운점", "구절"];

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
  const [activeTag, setActiveTag] = useState(0);
  const [isModalSmallVisible, setModalSmallVisible] = useState(false);
  const [isModalBookVisible, setModalBookVisible] = useState(false);
  const [showPopUp, setShowPopUp] = useState(router.query.isEdited || false);
  const [isReading, setIsReading] = useState(true);
  const handleTagClick = (index) => setActiveTag(index);
  const handleModalSmall = () => setModalSmallVisible(!isModalSmallVisible);
  const handleModalBook = () => setModalBookVisible(!isModalBookVisible);
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
        {!isReading && (
          <div className={styles.record_complete}>🎉완독했어요!🎉</div>
        )}
        <div className={styles.date_container}>
          <div className={styles.date_title}>시작한 날짜</div>
          <div className={styles.date}>YYYY.MM.DD</div>
        </div>
        {memoList.length !== 0 && (
          <div className={styles.date_container}>
            <div className={styles.date_title}>마지막 날짜</div>
            <div className={styles.date}>2023.01.28</div>
          </div>
        )}
      </div>
      <div className={styles.division}></div>
      <div>
        <div className={styles.subtitle_memo}>메모</div>
        {memoList.length === 0 ? (
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
                  {tag}
                </div>
              ))}
            </div>
            <div className={styles.memo_list_count}>{memoList.length}개</div>
            {memoList.map((memo) => (
              <MemoCard
                key={memo.id}
                memo={memo}
                handleClick={() =>
                  router.push(
                    {
                      pathname: "/record",
                      query: {
                        id: memo.id,
                        isEditPage: true,
                        memoText: memo.text,
                        memoTag: memo.category,
                      },
                    },
                    `/edit?memoId=${memo.id}`,
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
