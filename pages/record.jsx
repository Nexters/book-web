import { useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import styles from "@/styles/Record.module.scss";

const tags = ["#구절", "#느낀점"];

const Header = ({ title, goBackHandler, finishHandler }) => {
  return (
    <div className={styles.header_container}>
      <button>
        <img src="/images/backButton.svg" alt="back" onClick={goBackHandler} />
      </button>
      <h6 className={styles.header_title}>{title}</h6>
      <button onClick={finishHandler} className={styles.header_button}>
        완독
      </button>
    </div>
  );
};

const TextArea = ({ text, setText }) => {
  const isInValid = text.length > 150;
  return (
    <div className={styles.textArea_container}>
      <textarea
        rows={8}
        placeholder="메모를 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.textArea_text}
      />
      <div className="d-flex flex-row-reverse justify-content-between">
        <p
          className={cn(isInValid && styles.warnText, "mb-0")}
        >{`${text.length} / 150`}</p>
        {isInValid && (
          <p className={cn(isInValid && styles.warnText, "mb-0")}>
            150자 이하로 써주세요
          </p>
        )}
      </div>
    </div>
  );
};

const Tags = () => {
  return (
    <div className={styles.tags_container}>
      <h6 className={styles.tags_title}>태그를 입력해주세요</h6>
      <div className="d-flex">
        {tags.map((tag) => (
          <div className={styles.tags_keyword}>{tag}</div>
        ))}
      </div>
    </div>
  );
};

function Record() {
  const router = useRouter();
  const [text, setText] = useState("");
  //const [tag, setTag] = useState();
  //const isDisable = text.length>150 ||

  //NOTE: /record로 바로 접근 시 제목 데이터 가져올 수 없으므로 접근 제한이 필요할 듯 함.
  return (
    <div style={{ height: "100vh" }}>
      <Header title={router.query.title} goBackHandler={() => router.back()} />
      <TextArea text={text} setText={setText} />
      <div className={styles.division}></div>
      <Tags />
      <button className={styles.saveButton}>메모 저장하기</button>
    </div>
  );
}

export default Record;
