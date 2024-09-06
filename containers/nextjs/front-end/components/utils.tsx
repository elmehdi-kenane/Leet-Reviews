import { formatDistanceToNow } from "date-fns";

export const DataFormat = (company: any) => {
  if (company === undefined || company.createdAt === undefined)
    return "default date";
  const date = new Date(company.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
//   return `${formattedDate} (${year}-${month}-${day})`;
  return `${formattedDate}`;
};

export const trimFeedbackSubtitle = (originalFeedbackSubtitle: string) => {
  const maxChars = 190;
  if (originalFeedbackSubtitle.length <= maxChars)
    return originalFeedbackSubtitle;
  else return originalFeedbackSubtitle.slice(0, maxChars) + "...";
};
