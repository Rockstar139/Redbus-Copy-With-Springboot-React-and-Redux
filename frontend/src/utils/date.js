export const formatDateYYYYMMDD = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) return "";
  return d.toISOString().split("T")[0];
};

export const formatDateDDMMMYYY = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
