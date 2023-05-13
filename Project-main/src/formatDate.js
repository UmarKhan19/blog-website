export const formatTimeAgo = (dateString) => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  const timeDiff = Math.abs(currentDate - targetDate);
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff > 0) {
    return `${daysDiff} day${daysDiff !== 1 ? "s" : ""} ago`;
  } else {
    return "Today";
  }
};
