{
  const PASS = '100$';
  const TEXTS = {
    'english-text': `
<a target="_blank" href="https://us04web.zoom.us/j/79601212044?pwd=OlIdHjmOFaoTb4azGY4KUXucFgtTPy.1">
Подключиться к конференции Zoom
</a><br>
Идентификатор конференции: 796 0121 2044<br>
Код доступа: 7V8RHj
      `,
    'english-homework-text': `нужно выполнить 
    <a target="_blank" href="https://drive.google.com/drive/folders/1S8Vwrisqrmpk_sLN94yXqSN-a7LkWayE">практическую работу</a>
    до 15 октября и отправить на reg55@mail.ru, следующая встреча в zoom будет примерно после этого числа<br>
    потом будет еще одно задание, далее в декабре зачет
    `,
    'nir-email-text': `Al.kashtanov@mail.ru`,
    'nir-lk1-text': `<a target="_blank" href="https://cloud.mail.ru/public/kbjw/YMsfsxUMw">Лекция No 1 (39:13)</a>`,
    'nir-lk2-text': `<a target="_blank" href="https://cloud.mail.ru/public/Epq5/Uup3rjxCs">Лекция No 2 (31:27)</a>`,
    'nir-lk3-text': `<a target="_blank" href="https://cloud.mail.ru/public/eu9x/qZRqMdYnK">Лекция No 3 (24:21)</a>`,
    'nir-lb1-text': `<a target="_blank" href="https://cloud.mail.ru/public/Na2z/sS6FDJ4cv">Лабораторная работа No 1</a>`,
    'nir-lb2-text': `<a target="_blank" href="https://cloud.mail.ru/public/xG9R/qFpfSnBbN">Лабораторная работа No 2</a>`,
    'nir-lb3-text': `<a target="_blank" href="https://cloud.mail.ru/public/Q69A/ukETc64SM">Лабораторная работа No 3</a>`,
    'aisu-group-text': `<a target="_blank" href="https://vk.me/join/AJQ1d4qEMykdLx0dc0LKWdID">группа в ВК АиСУ (Малютин А.Г.) и студенты</a>`,
    'it-email-text': 'd.a.elizarov@yandex.ru',
    'it-managment-text': `<a target="_blank" href="https://drive.google.com/drive/folders/1zLYD3l4OX8QFLHkpClWkJax1hvaLgHVr">
ссылка на гугл диск на два первых семетра: лекции и лаботорные</a>`,
    'ifk-group-text': `<a target="_blank" href="https://vk.com/club222357509">Группа в ВК от преподавателя</a>`,
    'ifk-methodical-text': `В этой группе есть пост с ссылкой на <a target="_blank" href="https://cloud.mail.ru/public/fE6E/ni9UCS45n">лекции, учебники и темы семинаров</a> (облако)`,
    'ifk-audio-text': `<a target="_blank" href="https://cloud.mail.ru/public/hFSk/KcZZfdoaD">
аудиозапи занятий по предмету, сделанными в прошлые года</a> (облако)`,
    'ifk-methodical-manual-c1-text': `<a target="_blank" href="/pdf_viewer/?educational_and_methodical_manual_on_LMN_c1">Учебно-методическое пособие по ЛМН.pdf (практические, 1 курс)</a> (прямая ссылка)`,
    'ifk-methodical-lectures-c1-text': `<a target="_blank" href="/pdf_viewer/?textbook_for_lectures_c1">Логика и методология науки. Учебное пособие к лекциям.pdf (лекции, 1 курс)</a> (прямая ссылка)`,
    'ifk-methodical-manual-c3-text': `<a target="_blank" href="/pdf_viewer/?educational_and_methodical_manual_on_LMN_c3">Учебно-методическое пособие по ФПНТ.pdf (подготовка к семинарам, 3 курс)</a> (прямая ссылка)`,
    'ifk-methodical-lectures-c3-text': `<a target="_blank" href="/pdf_viewer/?textbook_for_lectures_c3">История и философия науки и техники. Учебное пособие.pdf (лекции, 3 курс)</a> (прямая ссылка)`,
  }
//   const ENLISH_ZOOM = `
// <a target="_blank" href="https://us04web.zoom.us/j/79601212044?pwd=OlIdHjmOFaoTb4azGY4KUXucFgtTPy.1">
// Подключиться к конференции Zoom
// </a><br>
// Идентификатор конференции: 796 0121 2044<br>
// Код доступа: 7V8RHj
//   `;
  // const AISU = `<a target="_blank" href="https://vk.me/join/AJQ1d4qEMykdLx0dc0LKWdID">группа в ВК АиСУ (Малютин А.Г.) и студенты</a>`;
//   const IT_MANAGMENT = `<a target="_blank" href="https://drive.google.com/drive/folders/1zLYD3l4OX8QFLHkpClWkJax1hvaLgHVr">
//   ссылка на гугл диск на два первых семетра: лекции и лаботорные
// </a>`;
//   const IFK_GROUP = `<a target="_blank" href="https://vk.com/club222357509">Группа в ВК от преподавателя</a>`;
//   const IFK_METODICAL = `В этой группе есть пост с ссылкой на <a href="https://cloud.mail.ru/public/fE6E/ni9UCS45n">лекции, учебники и темы семинаров</a>`;
//   const IFK_AUDIO = `<a href="https://cloud.mail.ru/public/hFSk/KcZZfdoaD">
//   аудиозапи занятий по предмету, сделанными в прошлые года
// </a>`;


  const div = document.getElementById('login-section');
  const btn = div.querySelector('button');
  const input = div.querySelector('input');
  const info = div.querySelector('.text-danger');

  
  const enterPass = (event) => {
    if (event.keyCode === 13) {
      clickLogin();
    }
  }
  
  const clickLogin = () => {
    if (input.value !== PASS) {
      info.innerText = 'Неверный пароль';
      return;
    }
    btn.removeEventListener('click', clickLogin);
    input.removeEventListener('keyup', enterPass);
    div.remove();
    for (const [key, value] of Object.entries(TEXTS)) {
      document.getElementById(key).innerHTML = value;
    }
  }
  
  btn.addEventListener('click', clickLogin);
  input.addEventListener('keyup', enterPass);
}