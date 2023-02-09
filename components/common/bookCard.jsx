import styles from "@/styles/component/BookCard.module.scss";

function BookCard({ book, isSearchCard, isLibraryCard, handleClick }) {
  const { id, isbn, image, title, memoCount, author } = book;

  if (isSearchCard) {
    return (
      <div className={styles.container}>
        <img src={image} alt="book_img" className={styles.image} />
        <div className={styles.contents}>
          <h6 className={styles.title}>{title}</h6>
          <div className="d-flex">
            <span className={styles.author_title}>저자</span>
            <span className={styles.author}>{author}</span>
          </div>
        </div>
        <button
          onClick={() => handleClick({ ISBN: String(isbn), title })}
          className={styles.button}
        >
          읽기
        </button>
      </div>
    );
  } else if (isLibraryCard) {
    return (
      <div key={id} className={styles.lib_container} onClick={handleClick}>
        <img src={image} alt="book_img" className={styles.lib_image} />
        <div className={styles.lib_contents}>
          <div className={styles.lib_title}>{title}</div>
          <div className={styles.lib_memo_count}>메모 {memoCount}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <img src={image} alt="book_img" className={styles.image} />
      <div className={styles.contents}>
        <div className={styles.title}>{title}</div>
        <div className={styles.memo_count}>메모 {memoCount}개 기록 중</div>
      </div>
      <img
        src="/images/rightArrow.svg"
        alt="detail"
        className={styles.detail}
        onClick={handleClick}
      />
    </div>
  );
}

export default BookCard;
