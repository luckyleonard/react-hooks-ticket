export function formatDate(timestamp = Date.now()) {
  const target = new Date(timestamp);
  target.setUTCHours(0);
  target.setUTCMinutes(0);
  target.setUTCSeconds(0);
  target.setUTCMilliseconds(0);
  return target.getTime();
}
