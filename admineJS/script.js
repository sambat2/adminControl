let products = [];

function add() {
  event.preventDefault();
  const imgInput = document.getElementById("img").files[0];
  const nameProduct = document.getElementById("name").value;
  const info = document.getElementById("info").value;
  const price = parseFloat(document.getElementById("price").value);
  const cardBox = document.getElementById("card-container");

  if (imgInput && nameProduct && info && !isNaN(price)) {
    const imgURL = URL.createObjectURL(imgInput);

    const product = {
      img: imgURL,
      name: nameProduct,
      info: info,
      price: price,
    };
    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();

    document.getElementById("productForm").reset();
  } else {
    alert("Please fill all fields correctly.");
  }
}

function displayProducts() {
  const cardBox = document.getElementById("card-container");
  let row = "";
  products.forEach((p, index) => {
    row += `
            <div class="wrapper">
              <div class="card">
                <img src="${p.img}" alt="${p.name}">
                <div class="card-content">
                  <h3>${p.name}</h3>
                  <p>${p.info}</p>
                  <p class="price">$${p.price.toFixed(2)}</p>
                  <button class="remove-btn" onclick="removeProduct(${index})">Remove</button>
                </div>
              </div>
            </div>`;
  });
  cardBox.innerHTML = row;
}

function removeProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}

window.onload = function () {
  const savedProducts = JSON.parse(localStorage.getItem("products"));
  if (savedProducts) {
    products = savedProducts;
    displayProducts();
  }
};
