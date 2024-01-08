const today = new Date();
const startOfDay = new Date(today.toDateString());
// 24 hours in milliseconds = 1000 * 60 * 60 * 24
const endOfDay = new Date(startOfDay.getTime() + 1000 * 60 * 60 * 24);
const endOfWeek = new Date(startOfDay.getTime() + 1000 * 60 * 60 * 24 * 7);

export default { today, startOfDay, endOfDay, endOfWeek };
