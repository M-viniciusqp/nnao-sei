const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

// Função para carregar produtos do localStorage
function loadProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  productList.innerHTML = '';
  products.forEach((product, index) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Preço: R$${product.price}</p>
      <button onclick="deleteProduct(${index})">Excluir</button>
    `;
    productList.appendChild(productDiv);
  });
}

// Função para converter imagem em Base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject('Erro ao processar a imagem');
    reader.readAsDataURL(file);
  });
}

// Adicionar produto
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const imageFile = document.getElementById('image').files[0];

  if (!imageFile) {
    alert('Por favor, selecione uma imagem.');
    return;
  }

  try {
    const imageBase64 = await convertToBase64(imageFile); // Converte para Base64
    const newProduct = { name, price, image: imageBase64 };

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    form.reset();
    loadProducts();
  } catch (error) {
    console.error(error);
    alert('Erro ao adicionar produto. Tente novamente.');
  }
});

// Excluir produto
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  loadProducts();
}

// Carrega os produtos ao iniciar
loadProducts();
