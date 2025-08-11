import React from "react";

export default function App() {
  const year = 2025;
  const month = 8; // 0-Index based

  // Calculate number of days in a month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 0 = Sunday, .... 6 = Saturday
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Array with days
  const days = Array.from({ length: daysInMonth + firstDayOfWeek }, (_, i) => {
    if (i < firstDayOfWeek) return null; //padding
    return i - firstDayOfWeek + 1; // day number
  });

  console.log(days);

  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Weekday headers */}
      <div className="font-mono text-sm">Sun</div>
      <div className="font-mono text-sm">Mon</div>
      <div className="font-mono text-sm">Tue</div>
      <div className="font-mono text-sm">Wed</div>
      <div className="font-mono text-sm">Thu</div>
      <div className="font-mono text-sm">Fri</div>
      <div className="font-mono text-sm">Sat</div>

      {/* Day buttons */}
      {days.map((day, index) => (
        <button
          key={index}
          className={`font-mono text-sm ${
            day ? "bg-gray-200" : "bg-transparent"
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
