const menu = document.getElementById('menu');

// Carrega os produtos do localStorage
function loadMenu() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  menu.innerHTML = '';
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Preço: R$${product.price}</p>
    `;
    menu.appendChild(productDiv);
  });
}

loadMenu();
