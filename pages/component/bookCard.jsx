import styles from "@/styles/component/BookCard.module.scss";
import { useRouter } from "next/router";

function BookCard({ book }) {
  const router = useRouter();
  const { id, image, title, memo } = book;
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
        onClick={() => router.push(`/memo/${id}`)}
      />
    </div>
  );
}

export default BookCard;
