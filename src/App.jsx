import React, { useState, useEffect } from "react";

export default function App() {
  const year = 2025;
  const month = 7; // 0-Index based

  // Calculate number of days in a month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 0 = Sunday, .... 6 = Saturday
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Array with days
  const days = Array.from({ length: daysInMonth + firstDayOfWeek }, (_, i) => {
    if (i < firstDayOfWeek) return null; //padding
    return i - firstDayOfWeek + 1; // day number
  });

  // State to store selected moods
  const [moods, setMoods] = useState(() => {
    const savedMoods = localStorage.getItem("moods");
    return savedMoods ? JSON.parse(savedMoods) : {};
  });

  // List of emojis to cycle through
  const emojis = ["😊", "😐", "😢", "😡", "😎"];

  function handleClick(day) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const currentEmoji = moods[dateKey] || emojis[0];
    const nextIndex = (emojis.indexOf(currentEmoji) + 1) % emojis.length;

    setMoods((prevMoods) => {
      const newMoods = {
        ...prevMoods,
        [dateKey]: emojis[nextIndex],
      };
      localStorage.setItem("moods", JSON.stringify(newMoods));
      return newMoods;
    });
  }

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
          onClick={() => day && handleClick(day)}
        >
          {day ? (
            <>
              {day}
              {
                moods[
                  `${year}-${String(month + 1).padStart(2, "0")}-${String(
                    day
                  ).padStart(2, "0")}`
                ]
              }
            </>
          ) : (
            ""
          )}
        </button>
      ))}
    </div>
  );
}
