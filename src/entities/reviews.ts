export interface Review {
  id: number;
  name: string;
  date: string;
  avatar: string;
  text: string;
  rating: number;
  product?: string;
}

const parseDate = (s: string): number => {
  const [d, m, y] = s.split(".").map(Number);
  return new Date(y, m - 1, d).getTime();
};

export const reviewDateMs = (review: Review): number => parseDate(review.date);
