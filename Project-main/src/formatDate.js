// export const formatTimeAgo = (dateString) => {
//   const currentDate = new Date();
//   const targetDate = new Date(dateString);

//   const timeDiff = Math.abs(currentDate - targetDate);
//   const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

//   if (daysDiff > 0) {
//     return `${daysDiff} day${daysDiff !== 1 ? "s" : ""} ago`;
//   } else {
//     return "Today";
//   }
// };

export const formatTimeAgo = (dateString) => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  const timeDiff = Math.abs(currentDate - targetDate);
  const secondsDiff = Math.floor(timeDiff / 1000);

  if (secondsDiff >= 86400) {
    const daysDiff = Math.floor(secondsDiff / 86400);
    return `${daysDiff} day${daysDiff !== 1 ? "s" : ""} ago`;
  } else if (secondsDiff >= 3600) {
    const hoursDiff = Math.floor(secondsDiff / 3600);
    return `${hoursDiff} hour${hoursDiff !== 1 ? "s" : ""} ago`;
  } else if (secondsDiff >= 60) {
    const minutesDiff = Math.floor(secondsDiff / 60);
    return `${minutesDiff} minute${minutesDiff !== 1 ? "s" : ""} ago`;
  } else {
    return `${secondsDiff} second${secondsDiff !== 1 ? "s" : ""} ago`;
  }
};
