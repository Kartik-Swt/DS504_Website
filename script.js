function changer(obj) {
  obj.parentElement.querySelector(".nested").classList.toggle("active");
  obj.classList.toggle("caret-down");
}

function runner(obj, path) {
  // console.log(obj, path);
  if (typeof obj == "string") {
    // File
    var elem = document.createElement("li");
    var link = document.createElement("a");
    elem.classList = ["file"];
    link.setAttribute("href", path + "/" + obj);
    link.style.textDecoration = "none";
    link.setAttribute("target", "_blank");
    link.innerText = obj;
    elem.appendChild(link);
    return elem;
  } else {
    // Folder
    var fold = document.createElement("li");
    var value = document.createElement("span");
    value.classList = ["caret"];
    value.innerText = path.split("/").pop();
    value.setAttribute("onclick", "changer(this)");
    fold.appendChild(value);
    var child = document.createElement("ul");
    child.classList = ["nested"];
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value == "string")
        child.appendChild(runner(value, path));
      else
        child.appendChild(runner(value, path + "/" + key));
    }
    fold.appendChild(child);
    return fold;
  }
}

document.getElementById("my_treeview").appendChild(runner(materials, "Course Materials"));

var b = document.getElementById("annun");

for (let i = announcements.length - 1; i >= 0; i--) {
  let x = announcements[i];
  let container = document.createElement("div");
  container.classList = ["ann_elem"];
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let hr = document.createElement("hr");
  p1.innerText = x[0];
  p2.innerText = x[1];
  p1.classList = ["ann_elem_title"];
  p2.classList = ["ann_elem_body"];
  container.appendChild(p1);
  container.appendChild(hr);
  container.appendChild(p2);
  b.appendChild(container);
}
