// Target: 2044-10-21 00:00 local time (month is 0-indexed, so 9 = October).
const TARGET = new Date(2044, 9, 21, 0, 0, 0, 0);

const els = {
  years: document.getElementById("years"),
  months: document.getElementById("months"),
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};
const countdownEl = document.getElementById("countdown");
const finishedEl = document.getElementById("finished");

// Calendar-aware breakdown of the time between `from` and `to` (to > from).
function breakdown(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    // Borrow days from the previous month relative to the target date.
    const daysInPrevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += daysInPrevMonth;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function render() {
  const now = new Date();

  if (now >= TARGET) {
    countdownEl.hidden = true;
    finishedEl.hidden = false;
    return;
  }

  const t = breakdown(now, TARGET);
  els.years.textContent = t.years;
  els.months.textContent = t.months;
  els.days.textContent = t.days;
  els.hours.textContent = pad(t.hours);
  els.minutes.textContent = pad(t.minutes);
  els.seconds.textContent = pad(t.seconds);
}

render();
setInterval(render, 1000);
