const Button = ({
  onClick,
  backgroundColor,
  color,
  radius,
  padding,
  fontSize,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
        color: color,
        border: "none",
        borderRadius: radius,
        padding: padding,
        fontFamily: "Pretendard Variable",
        fontSize: fontSize,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
