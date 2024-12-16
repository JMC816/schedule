export const formatDate = (day: Date) => {
  const years = day.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const months = day.toLocaleDateString("en-US", {
    month: "2-digit",
  });
  const days = day.toLocaleDateString("en-US", {
    day: "2-digit",
  });
  return `${years}-${months}-${days}`;
};
