// Helper function to truncate description to 50 words
const truncateDescription = (description, wordLimit) => {
  const words = description.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : description;
};

export default truncateDescription;
