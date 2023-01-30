export const formatDates = (date: string) => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString("es-En", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
