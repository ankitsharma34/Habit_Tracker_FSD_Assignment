import { useState } from "react";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const isSameDay = (d1, d2) => {
  const a = new Date(d1);
  const b = new Date(d2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const Calendar = ({ habit, onToggleDate, onClose }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const isDateCompleted = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return habit.completedDates.some((d) => isSameDay(d, date));
  };

  const isFutureDate = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    date.setHours(0, 0, 0, 0);
    const todayNorm = new Date();
    todayNorm.setHours(0, 0, 0, 0);
    return date > todayNorm;
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const handleDayClick = (day) => {
    if (isFutureDate(day)) return;
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = date.toISOString().split("T")[0];
    onToggleDate(habit._id, dateStr);
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    // Don't allow navigating beyond current month
    const now = new Date();
    if (currentYear === now.getFullYear() && currentMonth === now.getMonth()) {
      return;
    }
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isNextDisabled = () => {
    const now = new Date();
    return currentYear === now.getFullYear() && currentMonth === now.getMonth();
  };

  // Build grid cells
  const cells = [];
  // Empty cells for offset — use <button> same as day cells to avoid grid sizing mismatch
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(
      <button
        key={`empty-${i}`}
        className="calendar-day empty"
        disabled
        aria-hidden="true"
      />,
    );
  }
  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const completed = isDateCompleted(day);
    const future = isFutureDate(day);
    const todayDay = isToday(day);

    let className = "calendar-day";
    if (completed) className += " completed";
    if (future) className += " future";
    if (todayDay) className += " today";

    cells.push(
      <button
        key={day}
        className={className}
        onClick={() => handleDayClick(day)}
        disabled={future}
        title={
          future
            ? "Future date"
            : completed
              ? "Click to unmark"
              : "Click to mark complete"
        }
      >
        {day}
      </button>,
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={goToPrevMonth}>
          ◀
        </button>
        <span className="calendar-title">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </span>
        <button
          className="calendar-nav-btn"
          onClick={goToNextMonth}
          disabled={isNextDisabled()}
        >
          ▶
        </button>
        <button className="calendar-close-btn" onClick={onClose} title="Close calendar">
          ✕
        </button>
      </div>
      <div className="calendar-weekdays">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="calendar-weekday">
            {d}
          </div>
        ))}
      </div>
      <div className="calendar-grid">{cells}</div>
      <div className="calendar-legend">
        <span className="legend-item">
          <span className="legend-dot completed" /> Completed
        </span>
        <span className="legend-item">
          <span className="legend-dot not-completed" /> Not done
        </span>
        <span className="legend-item">
          <span className="legend-dot today-dot" /> Today
        </span>
      </div>
    </div>
  );
};

export default Calendar;
