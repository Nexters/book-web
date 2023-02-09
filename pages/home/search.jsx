import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import useDebounce from "@/components/hook/useDebounce";
import BookCard from "@/components/common/bookCard";
import data from "@/public/data/recommend.json";
import styles from "@/styles/Search.module.scss";

// NOTE: 임시 추천 검색어 데이터
const keywords = ["주식", "영어", "고전", "인테리어", "다이어트", "IT/인터넷"];

const SearchInput = ({ value, handleChange }) => {
  return (
    <div className={styles.input_container}>
      <div className={styles.input_wrapper}>
        <input
          className={styles.input}
          placeholder="검색어를 입력해주세요"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
        <img src="/images/search.svg" alt="search icon" />
      </div>
    </div>
  );
};

const PopularKeywords = ({ handleClick }) => {
  return (
    <div className={styles.keywords}>
      <p className={styles.subTitle}>추천 검색어</p>
      <div className={styles.keyword_wrapper}>
        {keywords.map((keyword) => (
          <div className={styles.keyword} onClick={() => handleClick(keyword)}>
            {keyword}
          </div>
        ))}
      </div>
    </div>
  );
};

const RecommendBook = () => {
  return (
    <div className={styles.recommend}>
      <p className={styles.subTitle}>추천 책</p>
      {data.book.map((book) => (
        <BookCard key={book.isbn} book={book} isSearchCard />
      ))}
    </div>
  );
};

const NoResultView = () => (
  <>
    <PopularKeywords />
    <div className={styles.noResult_container}>
      <img src="/images/noResult.svg" alt="no result" width="96" height="96" />
      <p className={styles.noResult_message}>
        앗! 입력한 검색어에 대한
        <br />
        결과가 존재하지 않습니다.
      </p>
    </div>
  </>
);

function Search() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const debouncedSearch = useDebounce(search, 300);

  const getSearchResult = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/books/search`,
      {
        params: { title: debouncedSearch },
      },
    );
    setResults(res.data);
  };

  useEffect(() => {
    if (debouncedSearch) {
      getSearchResult();
    }
  }, [debouncedSearch]);

  return (
    <div>
      <button onClick={() => router.back()} className={styles.backButton}>
        <img src="/images/backButton.svg" alt="back button" />
      </button>
      <div className={styles.title}>검색</div>
      <SearchInput value={search} handleChange={setSearch} />
      {debouncedSearch.length === 0 ? (
        <>
          <PopularKeywords handleClick={setSearch} />
          <RecommendBook />
        </>
      ) : (
        <>
          {results.length === 0 ? (
            <NoResultView />
          ) : (
            <div className="mt-3">
              {results.map((result) => (
                <BookCard key={result.isbn} book={result} isSearchCard />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Search;