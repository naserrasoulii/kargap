// Fetch Data
async function getDataFromJson() {
  const response = await fetch("./data.json");
  const res1 = await response.json();
  return res1;
}
// get Data
getDataFromJson().then((res) => {
  data = res;
  htmlCreate();
});
// items append this element
const itemContainer = document.querySelector(".itemContainer1 .navCustom");

const itemFooter = document.querySelector(
  ".homeWithSideBar .sideBar .itemFooter .navCustom"
);
// create DOM with data
function htmlCreate() {
  let x = 0;
  for (const item of data) {
    if (item.type == 2) {
      addToHtmlType2(item);
    } else {
      if (item.dropdown.length > 1) {
        withDropDown(item, x);
      } else {
        noDropDown(item);
      }
    }
    x++;
  }
  itemContainer.style.paddingBottom = itemFooter.offsetHeight + 20 + "px";
}

// item no Drop Dowm menu
function noDropDown(item) {
  let liItem = document.createElement("li");
  let aItem = document.createElement("button");
  let iItem = document.createElement("i");
  aItem.innerText = item.title;
  liItem.classList.add("nav-item");
  liItem.classList.add("navItemCustom");
  liItem.classList.add("d-flex");
  liItem.classList.add("align-items-center");
  aItem.classList.add("nav-link");
  aItem.classList.add("navLinkCustom");
  item.icon = item.icon.split(" ");
  for (const icons of item.icon) {
    iItem.classList.add(icons);
  }
  aItem.setAttribute("data-target-custom", item.target);
  aItem.setAttribute("id", item.id);
  liItem.appendChild(iItem);
  liItem.appendChild(aItem);
  itemContainer.appendChild(liItem);
}

// item DropDown exist
function withDropDown(item, x) {
  let liItem = document.createElement("li");
  let aItem = document.createElement("button");
  let iItem = document.createElement("i");
  let divItem = document.createElement("div");
  let divDropdown = document.createElement("div");
  aItem.innerText = item.title;
  liItem.classList.add("nav-item");
  liItem.classList.add("navItemCustom");
  liItem.classList.add("d-flex");
  liItem.classList.add("align-items-start");
  liItem.classList.add("dropdown");
  liItem.setAttribute("data-toggle-custom", `num${x}`);
  divItem.classList.add("w-100");
  divItem.classList.add("d-flex");
  divItem.classList.add("flex-column");
  divItem.classList.add("toggleDiv");
  divItem.addEventListener("click", addClassToggle);
  divItem.setAttribute("data-toggle-custom", `num${x}`);
  aItem.classList.add("nav-link");
  aItem.classList.add("navLinkCustom");
  aItem.classList.add("dropdown-toggle");
  aItem.classList.add("w-100");
  aItem.setAttribute("data-toggle", "dropdown");
  divDropdown.classList.add("dropdown-menu");
  item.icon = item.icon.split(" ");
  for (const icons of item.icon) {
    iItem.classList.add(icons);
  }
  liItem.appendChild(iItem);
  liItem.appendChild(divItem);
  divItem.appendChild(aItem);
  divItem.appendChild(divDropdown);
  divItem.appendChild(divDropdown);
  itemContainer.appendChild(liItem);

  // dropdown-item
  for (const itemdropdown of item.dropdown) {
    const iDropDown = document.createElement("i");
    const pNew = document.createElement("p");
    const aDropDown = document.createElement("button");
    aDropDown.classList.add("d-flex");
    aDropDown.classList.add("dropdown-item");
    aDropDown.classList.add("align-items-center");
    aDropDown.setAttribute("data-target-custom", itemdropdown.target);
    aDropDown.setAttribute("id", itemdropdown.id);
    itemdropdown.icon = itemdropdown.icon.split(" ");
    for (const icons1 of itemdropdown.icon) {
      iDropDown.classList.add(icons1);
    }
    pNew.classList.add("m-0");
    pNew.classList.add("mr-2");
    pNew.innerText = itemdropdown.title;
    aDropDown.appendChild(iDropDown);
    aDropDown.appendChild(pNew);
    divDropdown.appendChild(aDropDown);
  }
}

function addClassToggle(e) {
  if (!e.target.classList.contains("dropdown")) {
    if (!e.target.parentNode.classList.contains("dropdown")) {
      if (!e.target.parentNode.parentNode.classList.contains("dropdown")) {
        console.log("parent Error");
      } else {
        e.target.parentNode.parentNode.classList.toggle("active");
        e.target.addEventListener("click", addClassToggle);
        checkClass(e.target.parentNode.parentNode);
      }
    } else {
      e.target.parentNode.classList.toggle("active");
      e.target.parentNode.addEventListener("click", addClassToggle);
      checkClass(e.target.parentNode);
    }
  } else {
    e.target.classList.toggle("active");
    e.target.addEventListener("click", addClassToggle);
    checkClass(e.target);
  }
}

// type 2 item footer
function addToHtmlType2(item) {
  console.log(item);
  let liItem = document.createElement("li");
  let aItem = document.createElement("button");
  let iItem = document.createElement("i");
  liItem.classList.add("nav-item");
  liItem.classList.add("navItemCustom");
  liItem.classList.add("d-flex");
  liItem.classList.add("align-items-center");
  aItem.classList.add("nav-link");
  aItem.classList.add("navLinkCustom");
  aItem.innerText = item.title;
  item.icon = item.icon.split(" ");
  for (const icons of item.icon) {
    iItem.classList.add(icons);
  }
  liItem.appendChild(iItem);
  liItem.appendChild(aItem);

  itemFooter.appendChild(liItem);
}

// remove from some divs active
function checkClass(data) {
  console.log(data);
  const dropDownItemCustom = document.querySelectorAll(
    ".homeWithSideBar .dropdown"
  );
  dropDownItemCustom.forEach((el) => {
    if (
      el.getAttribute("data-toggle-custom") ==
      data.getAttribute("data-toggle-custom")
    ) {
      console.log(true);
    } else {
      el.classList.remove("active");
    }
  });
}
// toggle sidebar
function toggleSideBar() {
  const sideBar = document.querySelector(".homeWithSideBar .sideBar");
  const iframeContainer = document.querySelector(
    ".homeWithSideBar .iframeContainerCustom"
  );
  sideBar.classList.toggle("show");
  btnCloseMenu.classList.toggle("show");
  iframeContainer.classList.toggle("show");
}
const btnCloseMenu = document.querySelector(".homeWithSideBar .btnCloseMenu");
btnCloseMenu.addEventListener("click", toggleSideBar);
