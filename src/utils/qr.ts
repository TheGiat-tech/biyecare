export const parseOrderToken = (
  payload: string
): { orderId: string } | null => {
  const match = payload.match(/^\s*biye\s*:\s*order\s*:\s*(\S+)\s*$/i);
  if (!match) {
    return null;
  }
  return { orderId: match[1] };
};
