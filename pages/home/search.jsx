import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Api } from "@/utils/api";

import useDebounce from "@/components/hook/useDebounce";
import useIntersectionObserver from "@/components/hook/useIntersectionObserver";
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
          <div
            key={keyword}
            className={styles.keyword}
            onClick={() => handleClick(keyword)}
          >
            {keyword}
          </div>
        ))}
      </div>
    </div>
  );
};

const RecommendBook = ({ handleClick }) => {
  return (
    <div className={styles.recommend}>
      <p className={styles.subTitle}>추천 책</p>
      {data.book.map((book) => (
        <BookCard
          key={book.isbn}
          book={book}
          isSearchCard
          handleClick={handleClick}
        />
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const registerBook = async ({ ISBN, title }) => {
    const {
      data: { books },
    } = await Api.get(`/books?isReading=true`);
    const registeredBook = books.find((book) => book.ISBN === ISBN);
    if (!!registeredBook) {
      return registeredBook.ID;
    }

    const {
      data: { ID },
    } = await Api.post(`/books`, { ISBN });

    return ID;
  };

  const processReading = async ({ ISBN, title }) => {
    const {
      data: { books },
    } = await Api.get(`books?isReading=false`);
    if (books.findIndex((book) => book.ISBN === ISBN) !== -1) {
      router.push(
        { pathname: "/library", query: { activeTab: 1 } },
        "/library",
      );
      return;
    }
    const id = await registerBook({ ISBN, title });
    router.push({
      pathname: "/record",
      query: { title, id },
    });
  };

  const getInitialResult = async () => {
    const { data } = await Api.get(`/books/search`, {
      params: { title: debouncedSearch },
    });
    setResults(data);
  };

  const getSearchResult = async () => {
    console.log(page);
    const { data } = await Api.get(`/books/search`, {
      params: { title: debouncedSearch, page: page + 1 },
    });
    setPage(page + 1);
    setResults([...results, ...data]);
  };

  const fetchNextPage = async () => {
    setLoading(true);
    await getSearchResult();
    setLoading(false);
  };

  useEffect(() => {
    if (debouncedSearch) {
      setResults([]);
      setPage(1);
      getInitialResult();
    }
  }, [debouncedSearch]);

  const bottomRef = useIntersectionObserver(fetchNextPage);

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
          <RecommendBook handleClick={processReading} />
        </>
      ) : (
        <>
          {results.length === 0 ? (
            <NoResultView />
          ) : (
            <div className="mt-3">
              {results.map((result) => (
                <BookCard
                  key={result.isbn}
                  book={result}
                  isSearchCard
                  handleClick={processReading}
                />
              ))}
              {!loading && <div ref={bottomRef} />}
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Search;
