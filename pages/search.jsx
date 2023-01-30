import { useRouter } from "next/router";

import BookCard from "./component/bookCard";
import data from "@/public/data/recommend.json";
import styles from "@/styles/Search.module.scss";

// NOTE: 임시 추천 검색어 데이터
const keywords = ["주식", "영어", "고전", "인테리어", "다이어트", "IT/인터넷"];

const SearchInput = () => {
  return (
    <div className={styles.input_container}>
      <div className={styles.input_wrapper}>
        <input className={styles.input} placeholder="검색어를 입력해주세요" />
        <img src="/images/search.svg" alt="search icon" />
      </div>
    </div>
  );
};

const PopularKeywords = () => {
  return (
    <>
      <p className={styles.subTitle}>추천 검색어</p>
      <div className={styles.keyword_wrapper}>
        {keywords.map((keyword) => (
          <div className={styles.keyword}>{keyword}</div>
        ))}
      </div>
    </>
  );
};

const RecommendBook = () => {
  return (
    <div className={styles.recommend}>
      <p className={styles.subTitle}>추천 책</p>
      {data.book.map((book) => (
        <BookCard book={book} isSearchCard />
      ))}
    </div>
  );
};

function Search() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()} className={styles.backButton}>
        <img src="/images/backButton.svg" alt="back button" />
      </button>
      <div className={styles.title}>검색</div>
      <SearchInput />
      <PopularKeywords />
      <RecommendBook />
    </div>
  );
}
export default Search;
