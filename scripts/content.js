function parseTime(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}:${remainingMinutes.toString().padStart(2, '0')}`;
}

function getTimeDifference(timeString1, timeString2) {
  const time1 = parseTime(timeString1);
  const time2 = parseTime(timeString2);
  return time1 - time2;
}

const actualWorkingDays = document.querySelector(
  '#collapseInfo > div:nth-child(2) > div > div.card-body > table > tbody > tr:nth-child(2) > td > span'
);

if (actualWorkingDays !== undefined) {
  const days = parseInt(actualWorkingDays.textContent);

  const actualWorkingHours = document.querySelector(
    '#collapseInfo > div:nth-child(3) > div > div.card-body > table > tbody > tr:nth-child(1) > td > span'
  );
  const total = actualWorkingHours.textContent;

  const diff = getTimeDifference(total, `${days * 8}:00`);
  const formattedDiff = formatTime(Math.abs(diff));
  const sign = diff < 0 ? '-' : '+';

  const deviationFromDesignatedTime = document.querySelector(
    '#collapseInfo > div:nth-child(3) > div > div.card-body > table > tbody > tr:nth-child(10) > td > span'
  );
  deviationFromDesignatedTime.innerHTML = `<span style="font-size:200%;">${sign}${formattedDiff}</span>`;

  const color = diff < 0 ? 'red' : 'green';
  const td = deviationFromDesignatedTime.parentElement;
  td.classList.remove('jbc-text-danger');
  td.style.color = color;
  actualWorkingHours.style.color = color;
}
