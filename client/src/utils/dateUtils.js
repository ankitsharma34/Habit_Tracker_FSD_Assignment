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
