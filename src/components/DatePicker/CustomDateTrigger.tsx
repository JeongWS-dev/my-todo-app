import React from "react";

type Props = {
  value?: string;
  onClick?: () => void;
};

const CustomDateTrigger = React.forwardRef<HTMLDivElement, Props>(
  ({ value, onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      style={{
        padding: "8px 12px",
        backgroundColor: "#f7f1e8",
        borderRadius: "8px",
        border: "1px solid #ccc",
        color: "#4e3629",
        cursor: "pointer",
        userSelect: "none",
        width: "100px",
      }}
    >
      {value || "날짜 선택"}
    </div>
  )
);

export default CustomDateTrigger;
