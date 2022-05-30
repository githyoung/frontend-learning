// localStorage.clear();
// let inertProduct = document.createElement("tr");
let addButton = document.querySelector("form button");
let table = document.querySelector("section table");

addButton.addEventListener("click", (e) => {
  e.preventDefault();

  let form = e.target.parentElement;
  // upload product image and display
  //   uploadedImage = uploadPic();

  console.log("form", form);
  let prdPic = form.children[0].value; // 應該要存圖片url
  let prdPrice = form.children[1].value;
  let prdName = form.children[2].value;

  let inertProduct = document.createElement("tr");

  let pic = document.createElement("td");
  pic.classList.add("insert-text");
  pic.innerText = prdPic;

  let name = document.createElement("td");
  name.classList.add("insert-text");
  name.innerText = prdName;

  let price = document.createElement("td");
  price.classList.add("insert-text");
  price.innerText = "$NT " + prdPrice;

  let status = document.createElement("td");
  let label = document.createElement("label");
  label.classList.add("switch");
  label.innerHTML =
    `<input type="checkbox" id="chkbox" data-id=${prd.id} class="toggle-switch" checked /><span class="slider round"></span>`;
  status.appendChild(label);

  //   // status的狀態還沒存入localStorage
  //   //   想對label switch做addEventListener的動作
    // status.addEventListener("click", (e, index) => {
      // let todoItem = e.target.parentElement;
      // console.log("e.target: ", e.target.parentElement);
      // console.log("e.index: ", index);
      // todoItem.classList.toggle("done");
    // });

  inertProduct.appendChild(pic);
  inertProduct.appendChild(name);
  inertProduct.appendChild(price);
  inertProduct.appendChild(status);

  // create object
  let product = {
    id: Date.now(), // 用Date.now()來做id，但不是最佳做法，練習OK
    prdName: prdName,
    prdPrice: prdPrice,
    prdPic: prdPic,
    status: true,
  };

  let allPrds = localStorage.getItem("prds");
  if (allPrds == null) {
    localStorage.setItem("prds", JSON.stringify([product]));
  } else {
    let allPrdsArr = JSON.parse(allPrds);
    allPrdsArr.push(product);
    allPrdsArr = localStorage.setItem("prds", JSON.stringify(allPrdsArr));
  }

  // clear input column
  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";

  table.appendChild(inertProduct);
});


let allPrds = localStorage.getItem("prds");
if (allPrds != null) {
  allPrdsArr = JSON.parse(allPrds);
  allPrdsArr.forEach((prd) => {

    let inertProduct = document.createElement("tr");
    let pic = document.createElement("td");
    let name = document.createElement("td");
    let price = document.createElement("td");
    let status = document.createElement("td");
    let label = document.createElement("label");
    // 上方 create element 放在一起比較好閱讀, js 順序這樣也是OK的

    pic.classList.add("insert-text");
    pic.innerText = prd.prdPic;

    name.classList.add("insert-text");
    name.innerText = prd.prdName;

    price.classList.add("insert-text");
    price.innerText = "$NT " + prd.prdPrice;

    label.classList.add("switch");
    label.innerHTML =
      `<input type="checkbox" id="chkbox" data-id=${prd.id} class="toggle-switch" checked /><span class="slider round"></span>`;

    status.appendChild(label);
    inertProduct.appendChild(pic);
    inertProduct.appendChild(name);
    inertProduct.appendChild(price);
    inertProduct.appendChild(status);
    table.appendChild(inertProduct);

  });
}

// upload and display image
const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function () {
  console.log("myfile:", this.files);
  const reader = new FileReader();

  reader.addEventListener("load", (event) => {
    let uploaded_image = reader.result; // 裡面存放圖片的url
    document.querySelector(
      "#display-image"
    ).style.backgroundImage = `url(${uploaded_image})`;
  });

  reader.readAsDataURL(this.files[0]);
});


// switch label event
let switchButton = document.querySelectorAll(".toggle-switch");
for (let i = 0; i < switchButton.length; i++) {
    switchButton[i].addEventListener(
    "click",
    function (e) {
      console.log("switchButton click");
      console.log("data-id:", e.target.dataset.id);
    },
  );
}

