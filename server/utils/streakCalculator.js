// Normalize a date to midnight (for day-only comparison)
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

// Get difference in days between two dates
const daysDiff = (date1, date2) => {
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((normalizeDate(date1) - normalizeDate(date2)) / oneDay);
};

export const calculateStreaks = (completedDates = []) => {
  if (!completedDates || completedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastCompleted: null };
  }

  // Get unique normalized dates and sort ascending
  const uniqueDates = [
    ...new Set(completedDates.map((d) => normalizeDate(d))),
  ].sort((a, b) => a - b);

  let longestStreak = 1;
  let tempStreak = 1;

  // Calculate longest streak
  for (let i = 1; i < uniqueDates.length; i++) {
    const diff = (uniqueDates[i] - uniqueDates[i - 1]) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  // Calculate current streak (must include today or yesterday)
  const today = normalizeDate(new Date());
  const lastDate = uniqueDates[uniqueDates.length - 1];
  const daysSinceLast = (today - lastDate) / (1000 * 60 * 60 * 24);

  let currentStreak = 0;
  if (daysSinceLast <= 1) {
    currentStreak = 1;
    for (let i = uniqueDates.length - 2; i >= 0; i--) {
      const diff =
        (uniqueDates[i + 1] - uniqueDates[i]) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    lastCompleted: new Date(lastDate),
  };
};
