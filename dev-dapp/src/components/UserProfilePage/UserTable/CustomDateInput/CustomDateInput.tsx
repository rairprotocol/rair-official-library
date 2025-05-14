import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDateInput = ({ marginRight }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "16px",
        backgroundColor: "#151B23",
        border: "1px solid #3E4147",
        color: "#AAAAAA",
        width: "149px",
        height: "48px",
        marginRight: marginRight && "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "12px" }}>End at</div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            customInput={
              <input
                style={{
                  outline: "none",
                  background: "transparent",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  textAlign: "center",
                  width: "100px",
                }}
              />
            }
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#AAAAAA"
          viewBox="0 0 24 24"
        >
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM7 12h5v5H7z" />
        </svg>
      </div>
    </div>
  );
};

export default CustomDateInput;
