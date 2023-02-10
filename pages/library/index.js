import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "@/styles/Library.module.scss";
import Button from "@/components/common/Button";
import BookCard from "@/components/common/bookCard";
import Navigation from "@/components/common/Navigation";

const statusArr = [
  {
    title: "읽는 중",
    isReading: true,
  },
  {
    title: "완독",
    isReading: false,
  },
];

const NoBookList = () => {
  const router = useRouter();
  return (
    <div className={styles.book_empty}>
      <img src="/images/article.svg" alt="article" />
      <div className={styles.book_empty_text}>아직 읽고 있는 책이 없어요</div>
      <button
        className={styles.btn_gotoSearch}
        onClick={() => router.push("/home/search")}
      >
        책 고르러가기
      </button>
    </div>
  );
};

function Library() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookList, setBookList] = useState([]);
  const handleStatusClick = (index) => setActiveIndex(index);

  const getBookList = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/books?isReading=${statusArr[activeIndex].isReading}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    setBookList(res.data.books);
  };

  useEffect(() => {
    getBookList();
  }, [activeIndex]);

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
            {status.title}
          </div>
        ))}
      </div>
      <div className={styles.bookList_container}>
        {bookList.length === 0 ? (
          <NoBookList />
        ) : (
          <div>
            <div className={styles.bookList_count}>{bookList.length}개</div>
            <div className={styles.library_container}>
              {bookList
                .slice(0)
                .reverse()
                .map((book) => (
                  <BookCard
                    key={book.ID}
                    book={book}
                    handleClick={() => router.push(`/library/memo/${book.ID}`)}
                    isLibraryCard
                  />
                ))}
            </div>
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
}
export default Library;
