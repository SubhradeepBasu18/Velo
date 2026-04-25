import React from "react";

export const Ticker = () => {
  const items = ["Email campaigns", "SMS blasts", "10 msg/min", "Queue-based delivery", "Webhook callbacks", "Real-time analytics", "CSV import", "Scheduled sends", "DLQ retry", "Group campaigns"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border py-2.5">
      <div className="ticker-track gap-0">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-7 text-[13px] font-medium whitespace-nowrap tracking-wide"
            style={{ color: i % 2 === 0 ? "#666666" : "#A07828" }}
          >
            <span
              className={`block w-1 h-1 rounded-full flex-shrink-0 ${i % 3 === 0 ? "bg-gold" : "bg-border"}`}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};