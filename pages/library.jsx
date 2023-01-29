import { useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Library.module.scss";
import Button from "@/components/common/Buttton";

// 더미 데이터
const bookList = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

const statusArr = ["읽는 중", "완독"];

function Library() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleStatusClick = (index) => setActiveIndex(index);

  return (
    <div>
      <div className={styles.status_container}>
        {statusArr.map((status, index) => (
          <div
            key={index}
            onClick={() => handleStatusClick(index)}
            className={
              activeIndex === index
                ? styles.status_btn_selected
                : styles.status_btn_deSelected
            }
          >
            {status}
          </div>
        ))}
      </div>
      <div className={styles.bookList_container}>
        {bookList.length === 0 ? (
          <div className={styles.book_empty}>
            <img src="/images/article.svg" alt="article" />
            <div className={styles.book_empty_text}>
              아직 읽고 있는 책이 없어요
            </div>
            <Button
              backgroundColor="#17171B"
              color="white"
              radius="12px"
              padding="12px 24px"
              children="책 고르러가기"
            />
          </div>
        ) : (
          <div>
            <div className={styles.bookList_count}>{bookList.length}개</div>
            {bookList.map((book, index) => (
              <div key={index} className={styles.book_container}>
                <img
                  src={book.image}
                  alt="book_img"
                  className={styles.book_img}
                />
                <div className={styles.book_title_container}>
                  <div className={styles.book_title}>{book.title}</div>
                  <div className={styles.book_memo_count}>메모 {book.memo}</div>
                </div>
                <img
                  src="/images/rightArrow.svg"
                  alt="detail"
                  className={styles.book_detail}
                  onClick={() => router.push(`/memo/${index}`)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Library;
