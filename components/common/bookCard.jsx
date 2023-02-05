import styles from "@/styles/component/BookCard.module.scss";
import { useRouter } from "next/router";

function BookCard({ book, isSearchCard, handleClick }) {
  const { id, image, title, memo, author } = book;

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
        <button onClick={handleClick} className={styles.button}>
          읽기
        </button>
      </div>
    );
  }

  return (
    <div key={id} className={styles.container}>
      <img src={image} alt="book_img" className={styles.image} />
      <div className={styles.contents}>
        <div className={styles.title}>{title}</div>
        <div className={styles.memo_count}>메모 {memo}</div>
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