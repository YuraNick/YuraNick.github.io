document.body.addEventListener("lessons-shedule-loaded", (event) => {
  getLessonsSheduleChangedTime();
  sheduleTable.fillTable(event.detail);
  document.querySelector('.spinner-border').remove();
},{
  once: true,
});

async function getLessonsSheduleChangedTime() {
  const lessonsSheduleUrl = 'https://api.github.com/repos/YuraNick/YuraNick.github.io/commits?path=omgups/lessons-shedule.json&since=2024-08-01T00:00:00Z';
  fetch(lessonsSheduleUrl)
  .then(response => response.json())
  .then(commits => {
    const dateString = commits?.[0]?.commit.committer.date;
    if (!dateString) {
      return
    }
    const date = new Intl.DateTimeFormat('ru', {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
    const caprion = document.getElementById('lessons-shedule-caption') 
    caprion.innerText = caprion.innerText + " (изменено " + date + ")";
  })
}

const TABLE_ID = 'lessons-shedule';
const EVEN_NAME = 'Четная';
const UNEVEN_NAME = 'Нечетная';

const colSettings = [
  ["Дисциплина"],
  ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
  ["Преподаватель"],
];

const sheduleTable = {
  columns: [],
  currentEvenWeek: {},
  getColumns() {
    return colSettings.reduce((acc, arr) => {
      arr.forEach((val) => acc.push(val));
      return acc;
    }, [])
  },
  fillTable(data) {
    this.currentEvenWeek = this.getEvenWeekProperty();
    const table = document.getElementById(TABLE_ID);
    table.style.width = 'auto';
    table.style.margin = '0 auto';
    this.columns = this.getColumns();
    const headerColumns = this.getHeader();
    [EVEN_NAME, UNEVEN_NAME].forEach((week, index) => {
      const tbodyHtml = this.getBody({headerColumns, data, week});
      if (!table.tBodies[index]) {
        const tbody = document.createElement('tbody');
        tbody.innerHTML = tbodyHtml;
        table.appendChild(tbody);
      } else {
        table.tBodies[index].innerHTML = tbodyHtml;
      }
    });
  },
  getHeader() {
    const ths = this.columns.map(col => `<th>${col}</th>`);
    return `<tr class="text-center">${ths.join('')}</tr>`;
  },
  getBody({headerColumns, data, week} = {}) {
    const rows = data.map((subject, i) => {
      const row = this.getRow(subject, week, i);
      // const bg = (i % 2) ? ' class="bg-light"' : '';
      return `<tr>${row.join('')}</tr>`;
    });
    let weekText = `${week} неделя`;
    if (this.currentEvenWeek.name === week) {
      weekText += ` (текущая ${this.currentEvenWeek.curWeekFrom} - ${this.currentEvenWeek.curWeekTo})`;
    } else {
      weekText += ` (${this.currentEvenWeek.nextWeekFrom} - ${this.currentEvenWeek.nextWeekTo})`;
    }
    const weekInfoRow = `<tr><td class="text-center fst-italic text-success fw-weight-bold" colspan="${this.columns.length}"><b>${weekText}</b></td></tr>`;
    return weekInfoRow + headerColumns + rows.join('');
  },
  getRow(subject, week, i) {
    const cols = [];
    cols.push(subject.name);
    colSettings[1].forEach(() => cols.push(''));
    const {teacherHref, teacher} = subject;
    const teacherHtml = teacherHref ? `<a target="_blank" href="${teacherHref}">${teacher}</a>` : teacher;
    cols.push(teacherHtml);
    subject.shedule.forEach(cell => {
      const strictCellWeel = this.checkWeek(cell);
      if (strictCellWeel !== week) {
        return;
      }
      const cellIndex = this.checkDay(cell);
      let htmlCell = this.getCell(cell);
      if (cols[cellIndex]) {
        cols[cellIndex] += '<br>';
      }
      cols[cellIndex] += htmlCell;
    });
    const bgClass = !(i%2) ? ' bg-secondary bg-opacity-10' : '';
    return cols.map(col => `<td class="align-middle${bgClass}">${col}</td>`);
  },
  getCell(cell) {
    let htmlCell = `<strong>${cell.time}</strong> ${cell.type}<br><span class="text-nowrap">${cell.room}</span>`;
    if (cell.color) {
      htmlCell = `<span style="color:${cell.color}">${htmlCell}</span>`;
    }
    return htmlCell;
  },
  checkWeek(cell) {
    const cellWeek = cell.week.toLowerCase();
    if (['нч', 1, '1', 'нечетная', 'нечётная'].findIndex(val => cellWeek === val) > -1) {
      return UNEVEN_NAME;
    }
    if (['ч', 2, '2', 'четная', 'чётная'].includes(cellWeek) > -1) {
      return EVEN_NAME;
    }
    console.error('не определена неделя "урока": ', cell);
    return EVEN_NAME;
  },
  checkDay(cell) {
    const cellIndex = this.columns.findIndex(dayName => {
      return cell.day.toLowerCase() === dayName.toLowerCase();
    });
    if (cellIndex > -1) {
      return cellIndex;
    }
    console.error('не определен день "урока": ', cell);
    return 1;
  },
  getEvenWeekProperty() {
    const knownMonday = new Date("2026-09-28"); // 28 сентября 2026 - первая (нечетная) неделя началась с 28 сентября
    knownMonday.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Приводим "сегодня" к понедельнику текущей недели
    const dayOfWeek = (today.getDay() + 6) % 7; // 0 = ПН, 6 = ВС
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() - dayOfWeek);

    const weekMs = this.getWeeksMsByDays(7);
    const weeks = Math.round((currentMonday - knownMonday) / weekMs);

    // knownMonday — нечётная (weeks = 0)
    // weeks = 1 → чётная, weeks = 2 → нечётная, ...
    const isEven = weeks % 2 !== 0;

    const weekStart = currentMonday;
    const weekEnd = new Date(weekStart.getTime() + weekMs - this.getWeeksMsByDays(1));
    const nextStart = new Date(weekStart.getTime() + weekMs);
    const nextEnd = new Date(nextStart.getTime() + weekMs - this.getWeeksMsByDays(1));

    return {
      name: isEven ? EVEN_NAME : UNEVEN_NAME,
      curWeekFrom: this.getTextDate(weekStart),
      curWeekTo: this.getTextDate(weekEnd),
      nextWeekFrom: this.getTextDate(nextStart),
      nextWeekTo: this.getTextDate(nextEnd),
    };
  },
  getTextDate(date) {
    return `${this.getTwuSimbols(date.getDate())}.${this.getTwuSimbols(date.getMonth()+1)}.${date.getFullYear()}`;
  },
  getTwuSimbols(num) {
    const text = num.toString();
    if (text.length === 1) {
      return `0${text}`;
    }
    return text;
  },
  getWeeksMsByDays(days) {
    return days * 24 * 60 * 60 * 1000;
  }
}