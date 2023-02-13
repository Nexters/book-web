import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Api } from "@/utils/api";
import { Carousel } from "react-bootstrap";

import BookCard from "@/components/common/bookCard";
import styles from "@/styles/Home.module.scss";
import Navigation from "@/components/common/Navigation";

const bannerItems = [
  {
    id: 1,
    imageUrl: "/images/banner1.svg",
  },
  {
    id: 2,
    imageUrl: "/images/banner2.svg",
  },
];

const Header = ({ handleClick }) => (
  <div className={styles.header}>
    <h2 className={styles.title}>홈</h2>
    <p className={styles.info} onClick={handleClick}>
      안내
    </p>
  </div>
);

const Banner = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      controls={false}
      indicators={false}
      className={styles.banner}
    >
      {bannerItems.map((item) => (
        <Carousel.Item key={item.id} interval={4000}>
          <img src={item.imageUrl} className={styles.banner_image} />
        </Carousel.Item>
      ))}
    </Carousel>
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

  const [books, setBooks] = useState([]);

  const getBookList = async () => {
    const {
      data: { books },
    } = await Api.get(`/books?isReading=true`);
    setBooks(books);
  };

  useEffect(() => {
    getBookList();
  }, []);

  return (
    <div className={styles.container}>
      <Header handleClick={() => router.push("/home/onboarding")} />
      <Banner />
      <div>
        <h3 className={styles.subTitle}>읽는 중</h3>
        {books.map((book) => (
          <BookCard
            key={book.ID}
            book={book}
            handleClick={() =>
              router.push({
                pathname: "record",
                query: { title: book.title, id: book.ID },
              })
            }
          />
        ))}
        <AddBookButton handleClick={() => router.push("/home/search")} />
      </div>
      <Navigation />
    </div>
  );
}
export default Home;
