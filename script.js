document.getElementById("go_local").addEventListener("click", handleRedirect);
document.getElementById("settings").addEventListener("click", showSetting);
document.getElementById("save_settings").addEventListener("click", handleSubmit);
document.getElementById("cancel_settings").addEventListener("click", cancelSubmit);


function showDefault() {
  main_container = document.getElementById('go_local_container');
  main_container.style.display = "block";
  utility_container = document.getElementById('utility_text_box_container');
  utility_container.style.display = "none";
}

function showSetting() {
  main_container = document.getElementById('go_local_container');
  main_container.style.display = "none";
  utility_container = document.getElementById('utility_text_box_container');
  utility_container.style.display = "block";
  main_container = document.getElementById('utility_text_box');
  chrome.storage.local.get(["local_port"]).then((result) => {
    url = result.local_port ? result.local_port : '';
    main_container.value = url;
  });
}

function handleRedirect() {
  chrome.storage.local.get(["local_port"]).then((result) => {
    port = result.local_port ? result.local_port : '3000';

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      var url = new URL(tab.url)
      new_url = url.href.replace(url.origin, `http://localhost:${port}`);
      chrome.tabs.create({ url: new_url });
    })
  });
}

function handleSubmit() {
  main_container = document.getElementById('utility_text_box');
  value = main_container.value;
  chrome.storage.local.set({ "local_port": value }, function(){
    showDefault();
  });
}

function cancelSubmit() {
  showDefault();
}
