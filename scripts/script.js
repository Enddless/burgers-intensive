document.getElementById('main-action-button').onclick = function () {
  document
    .getElementById('products')
    .scrollIntoView({ behavior: 'smooth' });
};

let links = document.querySelectorAll('.menu-item > a');
for (let i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    document
      .getElementById(links[i].getAttribute('data-link'))
      .scrollIntoView({ behavior: 'smooth' });
  };
}

let buttons = document.getElementsByClassName('product-button');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    document
      .getElementById('order')
      .scrollIntoView({ behavior: 'smooth' });
  };
}

let burger = document.getElementById('burger');
let name = document.getElementById('name');
let phone = document.getElementById('phone');
document.getElementById('order-action').onclick = function () {
  let hasError = false;

  [burger, name, phone].forEach((item) => {
    if (!item.value) {
      item.parentElement.style.background = 'red';
      hasError = true;
    } else {
      item.parentElement.style.background = '';
      hasError = false;
    }
  });

  if (!hasError) {
    [burger, name, phone].forEach((item) => {
      item.value = '';
    });
    alert('Спасибо за заказ! Мы скоро свяжемся с вами!');
  }
};

let prices = document.getElementsByClassName('products-item-price');
document.getElementById('change-currency').onclick = function (e) {
  let currentCurrency = e.target.innerText;

  let newCurrency = '$';
  let coefficient = 1;

  if (currentCurrency === '$') {
    newCurrency = '₽';
    coefficient = 80;
  } else if (currentCurrency === '₽') {
    newCurrency = 'BYN';
    coefficient = 3;
  } else if (currentCurrency === 'BYN') {
    newCurrency = '€';
    coefficient = 0.9;
  } else if (currentCurrency === '€') {
    newCurrency = '¥';
    coefficient = 6.9;
  }
  e.target.innerText = newCurrency;
  for (let i = 0; i < prices.length; i++) {
    prices[i].innerText =
      +(
        prices[i].getAttribute('data-base-price') * coefficient
      ).toFixed(1) +
      ' ' +
      newCurrency;
  }
};

async function loadProducts() {
  try {
    const response = await fetch(
      'https://testologia.site/burgers-data?extra=black'
    );
    const products = await response.json();

    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    products.forEach((product) => {
      const productItem = document.createElement('li');
      productItem.className = 'products__item';
      productItem.innerHTML = `
              <img src="${product.image}" alt="${product.title}" width="324" height="250" class="products__item-image">
              <div class="products__item-title">${product.title}</div>
              <div class="products__item-text">${product.text}</div>
              <div class="products__item-extra">
                  <div class="products__item-price" data-base-price="${product.basePrice}">${product.basePrice} $</div>
                  <div class="products__item-weight">${product.grams}</div>
                  <button class="products__button button">
                      <span>Заказать</span>
                      <span>
                          <!-- SVG иконка здесь -->
                      </span>
                  </button>
              </div>
          `;
      productsList.appendChild(productItem);
    });
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

// Вызов функции загрузки продуктов
loadProducts();
