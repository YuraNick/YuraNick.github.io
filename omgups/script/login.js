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
    'aisu-group-text': `<a target="_blank" href="https://vk.me/join/AJQ1d4qEMykdLx0dc0LKWdID">группа в ВК АиСУ (Малютин А.Г.) и студенты</a>`,
    'it-managment-text': `<a target="_blank" href="https://drive.google.com/drive/folders/1zLYD3l4OX8QFLHkpClWkJax1hvaLgHVr">
ссылка на гугл диск на два первых семетра: лекции и лаботорные</a>`,
    'ifk-group-text': `<a target="_blank" href="https://vk.com/club222357509">Группа в ВК от преподавателя</a>`,
    'ifk-methodical-text': `В этой группе есть пост с ссылкой на <a target="_blank" href="https://cloud.mail.ru/public/fE6E/ni9UCS45n">лекции, учебники и темы семинаров</a> (облако)`,
    'ifk-audio-text': `<a target="_blank" href="https://cloud.mail.ru/public/hFSk/KcZZfdoaD">
аудиозапи занятий по предмету, сделанными в прошлые года</a> (облако)`,
    'ifk-methodical-manual-text': `<a target="_blank" href="/pdf_viewer/?educational_and_methodical_manual_on_LMN">Учебно-методическое пособие по ЛМН.pdf</a> (прямая ссылка)`,
    'ifk-methodical-lectures-text': `<a target="_blank" href="/pdf_viewer/?textbook_for_lectures">Логика и методология науки. Учебное пособие к лекциям.pdf</a> (прямая ссылка)`,
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