export const DOTS = 'dots' as const;

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function paginationRange(page: number, count: number, siblingCount: number) {
  const totalNumbers = siblingCount * 2 + 5;
  if (totalNumbers >= count) return range(1, count);

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, count);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < count - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + siblingCount * 2), DOTS, count];
  }
  if (showLeftDots && !showRightDots) {
    return [1, DOTS, ...range(count - (3 + siblingCount * 2) + 1, count)];
  }
  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, count];
}
