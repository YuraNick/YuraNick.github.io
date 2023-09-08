document.body.addEventListener("lessons-shedule-loaded", (event) => {
  sheduleTable.fillTable(event.detail);
},{
  once: true,
});

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
  getColumns() {
    return colSettings.reduce((acc, arr) => {
      arr.forEach((val) => acc.push(val));
      return acc;
    }, [])
  },
  fillTable(data) {
    const table = document.getElementById(TABLE_ID);
    this.columns = this.getColumns();
    const header = this.getHeader();
    table.tHead.innerHTML = header;
    [EVEN_NAME, UNEVEN_NAME].forEach((week, index) => {
      const tbodyHtml = this.getBody(data, week);
      if (!table.tBodies[index]) {
        const tbody = document.createElement('tbody');
        tbody.innerHTML = this.getBody(data, week);
        table.appendChild(tbody);
      } else {
        table.tBodies[index].innerHTML = tbodyHtml;
      }
    });
  },
  getHeader() {
    const ths = this.columns.map(col => `<th>${col}</th>`);
    return `<tr>${ths.join('')}</tr>`;
  },
  getBody(data, week) {
    const rows = data.map(subject => {
      const row = this.getRow(subject, week);
      return `<tr>${row.join('')}</tr>`;
    });
    return `<tr><td class="text-center fst-italic text-success" colspan="${this.columns.length}"><b>${week} неделя</b></td></tr>` + rows.join('');
  },
  getRow(subject, week) {
    const cols = [];
    cols.push(subject.name);
    colSettings[1].forEach(() => cols.push(''));
    cols.push(subject.teacher);
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

    return cols.map(col => `<td>${col}</td>`);
  },
  getCell(cell) {
    let htmlCell = `${cell.time} ${cell.type}<br>${cell.room}`;
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
  }
}
