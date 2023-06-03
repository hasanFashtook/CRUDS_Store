let inputs, title, price, taxes, ads, discount, count, category, submit, search, small, errorerrorMessage;
inputs = document.querySelectorAll(".inputs input");
title = document.getElementById("title");
price = document.getElementById("price");
taxes = document.getElementById("taxes");
ads = document.getElementById("ads");
discount = document.getElementById("discount");
count = document.getElementById("count");
category = document.getElementById("category");
submit = document.querySelector(".inputs button");
search = document.getElementById("search");
small = document.querySelector("small");
errorMessage = document.querySelector(".inputs p");





// get total
function getTotal() {
  if (price.value != "") {
    let total = document.createTextNode(`${ price.value - (+taxes.value + +ads.value + +discount.value )}`);
    if (small.innerHTML != "") {
      small.innerHTML = "";
      small.appendChild(total);
    } else {
      small.appendChild(total);
    }
    small.innerHTML != "" ? small.style.backgroundColor = `green` : small.style.backgroundColor = `#e5652f`;
  }
}





// create products
// add data to localStorage
let dataProduct;
if (localStorage.getItem("products")) {
  dataProduct = JSON.parse(localStorage.getItem("products"));
} else {
  dataProduct = [];
}
// id update for update data product
let idUpdate;
// add or update product(s)
submit.addEventListener("click", () => {
  // hide error message before edit data
  errorMessage.style.display = "none";
  // create product
  if (submit.innerHTML === "add") {
    let newPro = {
      ads: ads.value,
      category: category.value,
      discount: discount.value,
      price: price.value,
      taxes: taxes.value,
      title: title.value,
      total: small.innerHTML,
    }
    // check if data are correct
    if (title.value != "" && price.value != "" && category.value != "") {
      // add product to array
      if (count.value > 1) {
        // count 
        for (let i = 0; i < count.value; i++) {
          dataProduct.push(newPro);
        }
      } else {
        dataProduct.push(newPro);
      }
    }
  } else if (submit.innerHTML === "Update") {
    // clean Data
    if (title.value != "" && price.value != "" && category.value != "") {
      // update
      dataProduct[idUpdate] = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: small.innerHTML,
        category: category.value.toLowerCase()
      }
    } else {
      // show error msg if data are incomplete and prevent update
      errorMessage.style.display = "block";
    }
    submit.innerHTML = "Add";
    count.style.display = "block";
  }
  // store the products in local storage
  localStorage.setItem("products", JSON.stringify(dataProduct));
  // clear field inputs
  clearData();
  // read data from local storage
  readData();
  title.focus();
  // reset color 
  small.innerHTML != "" ? small.style.backgroundColor = `green` : small.style.backgroundColor = `#e5652f`;
})

// clear data
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  small.innerHTML = "";
  count.value = "";
  category.value = "";
}

function readData() {
  // get data from localStorage if available
  if (localStorage.getItem("products")) {
    let data = JSON.parse(localStorage.getItem("products"))
    let tbody = document.querySelector("tbody");

    //handle data from local storage 
    let table = ``;
    for (let i = 0; i < data.length; i++) {
      table += `
      <tr id=${i}>
    <td>${i + 1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button onclick = updateProduct(${i}) id="update">update</button></td>
    <td><button onclick = deleteProduct(${i}) id="delete">delete</button></td>
    </tr>
    `
    }
    tbody.innerHTML = table;
  }
}


// show data when app open
window.addEventListener("DOMContentLoaded", () => {
  readData();
  title.focus();
})




// delete product
function deleteProduct(i) {
  // i refer to element that trigger this function
  let data = JSON.parse(localStorage.getItem("products"));
  // remove this element from local storage 
  data.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(data));
  // rehandle rows from new data in local storage
  readData();
}


// update
function updateProduct(i) {
  // i refer to element that trigger this function
  idUpdate = i;
  // get data from local storage to edit on it 
  let data = JSON.parse(localStorage.getItem("products"));

  ({
    ads: ads.value,
    category: category.value,
    discount: discount.value,
    price: price.value,
    taxes: taxes.value,
    title: title.value,
    total: total.innerHTML,
  } = data[i]);
  getTotal(); // to change total to green color
  // change submit btn state because we are update now
  submit.innerHTML = "Update";
  // must to update element only
  count.style.display = "none";
  // to improvement user experience
  title.focus();
  scrollTo({
    top: 0,
    behavior: "smooth"
  })
}






// search
let searchField = document.querySelector(".outputs #search");
let searchBtn = document.querySelectorAll(".outputs button")
let searchMood = "title";

// select type of search
searchBtn.forEach(Btn => {
  Btn.addEventListener("click", () => {
    if (Btn.id === "searchTitle") {
      searchMood = "title";
      searchField.placeholder = "search by title"
    } else {
      searchMood = "category";
      searchField.placeholder = "search by category"
    }
    searchField.value = "";
    searchField.focus();
    readData();
  })
})

// start search and render resulted data
function Search(value) {
  let data = JSON.parse(localStorage.getItem("products"))

  // filter data depending on mood search type
  data = data.filter(data => {
    return searchMood === "title" ? data.title.includes(value) : data.category.includes(value);
  })

  let tbody = document.querySelector("tbody");
  let table = ``;
  for (let i = 0; i < data.length; i++) {
    table += `
    <tr id=${i}>
    <td>${i + 1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button onclick = updateProduct(${i}) id="update">update</button></td>
    <td><button onclick = deleteProduct(${i}) id="delete">delete</button></td>
    </tr>
    `
  }
  tbody.innerHTML = table;
}