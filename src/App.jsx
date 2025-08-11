import React, { useState, useEffect } from "react";

export default function App() {
  // Store current month and year in state
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-Index based

  // Calculate number of days in a month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // 0 = Sunday, .... 6 = Saturday
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

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

  // Map of emoji to score
  const emojiScores = {
    "😊": 5,
    "😎": 4,
    "😐": 3,
    "😢": 2,
    "😡": 1,
  };

  // Function to calculate average
  const calculateAverage = (moods) => {
    const totalScore = Object.values(moods).reduce(
      (sum, emoji) => sum + emojiScores[emoji],
      0
    );
    const count = Object.keys(moods).length;
    return count > 0 ? (totalScore / count).toFixed(1) : "N/A";
  };

  // Function to get background color based on score
  const getBackgroundColor = (score) => {
    if (score >= 4) return "bg-green-300";
    if (score <= 3) return "bg-yellow-300";
    return "bg-red-300";
  };

  // Calculate Avg mood
  const averageMood = calculateAverage(moods);

  function handleClick(day) {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
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

  // Function to handle previous month navigation
  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  // Function to handle next month navigation
  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  // Function to handle today button
  function handleToday() {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  }

  return (
    <div className="max-w-2xl mx-auto p-4 ">
      <div className="grid grid-cols-7 gap-2">
        {/* Display average mood */}
        <div className="col-span-7 font-mono text-lg text-center">
          Average Mood: {averageMood}
        </div>
        {/* Month and year display */}
        <div className="col-span-7 font-mono text-lg text-center">
          {new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        {/* Navigation Buttons */}
        <div className="col-span-7 flex justify-center">
          <button onClick={handlePrevMonth} className="font-mono text-lg p-2">
            &lt;
          </button>
          <button onClick={handleToday} className="font-mono text-lg p-2">
            Today
          </button>
          <button onClick={handleNextMonth} className="font-mono text-lg p-2">
            &gt;
          </button>
        </div>
        {/* Weekday headers */}
        <div className="font-mono text-lg">Sun</div>
        <div className="font-mono text-lg">Mon</div>
        <div className="font-mono text-lg">Tue</div>
        <div className="font-mono text-lg">Wed</div>
        <div className="font-mono text-lg">Thu</div>
        <div className="font-mono text-lg">Fri</div>
        <div className="font-mono text-lg">Sat</div>

        {/* Day buttons */}
        {days.map((day, index) => (
          <button
            key={index}
            className={`font-mono text-lg p-2 rounded ${
              day
                ? getBackgroundColor(
                    emojiScores[
                      moods[
                        `${currentYear}-${String(currentMonth + 1).padStart(
                          2,
                          "0"
                        )}-${String(day).padStart(2, "0")}`
                      ]
                    ]
                  )
                : "bg-transparent"
            }`}
            onClick={() => day && handleClick(day)}
          >
            {day ? (
              <>
                {day}
                {
                  moods[
                    `${currentYear}-${String(currentMonth + 1).padStart(
                      2,
                      "0"
                    )}-${String(day).padStart(2, "0")}`
                  ]
                }
              </>
            ) : (
              ""
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
