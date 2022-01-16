import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

// https://github.com/vercel/next.js/tree/canary/examples/blog-with-comment
export const distanceToNow = (dateTime: Date) => {
  return formatDistanceToNowStrict(dateTime, {
    addSuffix: true,
  })
}

type distanceCategoryType = 'early' | 'soon' | 'late'
export const distanceCategory = (dateTime: Date): distanceCategoryType => {
  const aDayLenght = new Date(0);
  aDayLenght.setDate(2);
  const timeNow = new Date();
  if (dateTime.getTime() - timeNow.getTime() > aDayLenght.getTime()) {
    return 'early';
  }
  if (dateTime.getTime() - timeNow.getTime() > 0) {
    return 'soon';
  }
  return 'late';
}