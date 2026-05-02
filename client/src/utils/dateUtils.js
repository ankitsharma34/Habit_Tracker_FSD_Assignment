// Check if a date is today
export const isToday = (date) => {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
};

// Check if habit is completed today
export const isCompletedToday = (completedDates = []) => {
  return completedDates.some((date) => isToday(date));
};

// Format date as "Today", "Yesterday", or "MMM DD, YYYY"
export const formatDate = (date) => {
  if (!date) return "Never";
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isToday(d)) return "Today";
  if (
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate()
  )
    return "Yesterday";

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Get fire emoji intensity based on streak
export const getStreakEmoji = (streak) => {
  if (streak === 0) return "";
  if (streak < 3) return "🔥";
  if (streak < 7) return "🔥🔥";
  if (streak < 30) return "🔥🔥🔥";
  return "🔥🔥🔥🔥";
};
