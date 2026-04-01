export const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + (minutes || 0);
};

export const sortResults = (results, rules) => {
  return [...results].sort((a, b) => {
    for (const rule of rules) {
      if (!rule.order) continue;

      let valA = a[rule.key];
      let valB = b[rule.key];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (rule.type === "time") {
        valA = timeToMinutes(valA);
        valB = timeToMinutes(valB);
      }

      let result = 0;
      const isNumberA = !isNaN(valA) && typeof valA !== "string";
      const isNumberB = !isNaN(valB) && typeof valB !== "string";

      if (isNumberA && isNumberB) {
        result = Number(valA) - Number(valB);
      } else {
        result = String(valA).localeCompare(String(valB));
      }

      if (result !== 0) {
        return rule.order === "asc" ? result : -result;
      }
    }
    return 0;
  });
};
