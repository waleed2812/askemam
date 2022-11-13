export const formatText = (str: string = "") =>
  str
    .toLowerCase()
    .split(/[^a-z]/)
    .join(" ")
    .split(/\s{2,}/)
    .join(" ");
