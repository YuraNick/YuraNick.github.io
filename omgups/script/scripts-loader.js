{
  const appendScript = (path, time) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    const src = `${path}?${time}`;
    script.setAttribute('src', src);
    document.body.appendChild(script);
  }
  const time = new Date().getTime();
  MY_SCRIPTS.forEach(path => {
    appendScript(path, time)
  });
}