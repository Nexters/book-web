import { useState } from "react";
import { useRouter } from "next/router";

import { Carousel } from "react-bootstrap";

import BookCard from "../components/common/bookCard";
import styles from "@/styles/Home.module.scss";

//NOTE: 배너 이미지 받고 수정 해야함
const bannerItems = [
  {
    id: 1,
    imageUrl: "/images/banner.png",
  },
  {
    id: 2,
    imageUrl: "/images/banner.png",
  },
];

//NOTE: 뷰를 보여주기 위한 임시 데이터
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
    title: "색채가 없는 다자키 쓰쿠루와 그가 순례를 떠난 해",
    author: "무라카미 하루키",
    link: "https://search.shopping.naver.com/book/catalog/32491516801",
    image:
      "https://shopping-phinf.pstatic.net/main_3249151/32491516801.20221019120322.jpg",
    discount: "13320",
    publisher: "민음사",
    isbn: "9788937487927",
    pubdate: "20130701",
    description:
      "돌아가야 할 곳에 돌아가기 위해, 되찾아야 할 것을 찾아내기 위해, 오늘 시작되는 특별한 여행! 전 세계가 기다려 온 무라카미 하루키의 초대형 베스트셀러 『색채가 없는 다자키 쓰쿠루와 그가 순례를 떠난 해』. 무라카미 하루키가 3년 만에 발표한 장편소설로 철도 회사에서 근무하는 한 남자가 잃어버린 과거를 찾기 위해 떠나는 순례의 여정을 그린 작품이다. 개인 간의 거리, 과거와 현재의 관계, 상실과 회복의 과정을 담아냈다. 한 사람이 삶에서 겪은 상실을 돌아보는 여정, 고통스럽고 지난하지만 한편으로 그립고 소중한 그 시간을 다자키 쓰쿠루와 함께하며 다시 삶을 향해 나아갈 희망을 얻게 된다. 서른여섯 살, 다자키 쓰쿠루는 철도 회사에서 역을 설계한다. 역을 만든다는 행위는 그에게 세상과의 연결을 뜻한다. 과거의 상실을 덮어 두고 묵묵히 살아가는 그에게 어느 날, 처음으로 사랑이 찾아온다. 그의 마음을 온통 사로잡은 두 살 연상의 여행사 직원 기모토 사라는 고등학교 시절, 다자키 쓰쿠루가 속한 완벽한 공동체와 그 결말에 대해 듣고 불현듯 ‘잃어버린 것’을 찾기 위한 순례의 여정을 제안하는데….",
    memo: 5,
  },
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.banner_container}>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
        className={styles.banner}
      >
        {bannerItems.map((item) => (
          <Carousel.Item key={item.id} interval={4000}>
            <img src={item.imageUrl} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

const AddBookButton = ({ handleClick }) => (
  <div className={styles.button_container} onClick={handleClick}>
    <div className={styles.button_image}>
      <img src="/images/plus.svg" />
    </div>
    <p className={styles.button_content}>새로운 책 추가하기</p>
  </div>
);

function Home() {
  const router = useRouter();

  return (
    <div>
      <h2 className={styles.title}>홈</h2>
      <Banner />
      <div>
        <h3 className={styles.subTitle}>읽는 중</h3>
        {bookList.map((book) => (
          <BookCard book={book} />
        ))}
        <AddBookButton handleClick={() => router.push("/search")} />
      </div>
    </div>
  );
}
export default Home;
