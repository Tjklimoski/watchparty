const today = new Date();
const start = new Date(today.toDateString());
const startOfDay = start.toISOString();
// 24 hours in milliseconds = 1000 * 60 * 60 * 24
const endOfDay = new Date(start.getTime() + 1000 * 60 * 60 * 24).toISOString();
const endOfWeek = new Date(
  start.getTime() + 1000 * 60 * 60 * 24 * 7
).toISOString();

export default { today, startOfDay, endOfDay, endOfWeek };
