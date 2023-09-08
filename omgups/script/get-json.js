fetch(`./lessons-shedule.json?${new Date().getTime()}`)
.then((response)=>{
  return response.json();
})
.then((data)=>{
  document.body.dispatchEvent(new CustomEvent("lessons-shedule-loaded", {
    detail: data
  }));
})
.catch((err)=>{
  console.log('error: ' + err);
  const span = document.createElement('span');
  span.classList.add('text-danger');
  span.innerText = ' ошибка получения расписания из json';
  document.getElementById('lessons-shedule-1').caption.appendChild(span);
  document.getElementById('lessons-shedule-2').caption.appendChild(span.cloneNode(true));
});