const form = document.getElementById('add-item-form');
const cart = document.getElementById('cart');
const total = document.getElementById('total');
const discountText = document.getElementById('discount');

let subtotal = 0;
let taxRate = 0;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const itemName = document.getElementById('item-name').value;
  const itemPrice = document.getElementById('item-price').value;
  const itemQuantity = document.getElementById('item-quantity').value;
  const state = document.getElementById('state').value;

  if (state === 'UT') {
    taxRate = 0.0685;
  } else if (state === 'NV') {
    taxRate = 0.08;
  } else if (state === 'TX') {
    taxRate = 0.0625;
  } else if (state === 'AL') {
    taxRate = 0.04;
  } else if (state === 'CA') {
    taxRate = 0.0825;
  }

  const itemSubtotal = itemPrice * itemQuantity;
  subtotal += itemSubtotal;

  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  nameCell.textContent = itemName;
  row.appendChild(nameCell);

  const priceCell = document.createElement('td');
  priceCell.textContent = `$${itemPrice}`;
  row.appendChild(priceCell);

  const quantityCell = document.createElement('td');
  quantityCell.textContent = itemQuantity;
  row.appendChild(quantityCell);

  const subtotalCell = document.createElement('td');
  subtotalCell.textContent = `$${itemSubtotal.toFixed(2)}`;
  row.appendChild(subtotalCell);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', () => {
    subtotal -= itemSubtotal;
    row.remove();
    updateTotal();
  });
  row.appendChild(deleteButton);

  cart.appendChild(row);
  updateTotal();
});

const updateTotal = () => {
  const discount = getDiscount();
  const tax = subtotal * taxRate;
  const grandTotal = subtotal - discount + tax;

  total.innerHTML = `
  <p>Sous-total: $${subtotal.toFixed(2)}</p>
  <p>Réduction: $${discount.toFixed(2)}</p>
  <p>Total hors taxe avec réduction: $${(subtotal - discount).toFixed(2)}</p>
  <p>Taxes: $${tax.toFixed(2)}</p>
  <p>Total toutes taxes comprises avec réduction: $${grandTotal.toFixed(2)}</p>
`;

  if (discount > 0) {
    discountText.textContent = `Une réduction de $${discount.toFixed(2)} est active.`;
  } else {
    discountText.textContent = 'Aucune réduction n\'est active.';
  }
};

const getDiscount = () => {
  if (subtotal >= 1000 && subtotal < 5000) {
    return subtotal * 0.0685;
  } else if (
    subtotal >= 5000 && subtotal < 7000) {
        return subtotal * 0.05;
      } else if (subtotal >= 7000 && subtotal < 10000) {
        return subtotal * 0.07;
      } else if (subtotal >= 10000 && subtotal < 50000) {
        return subtotal * 0.1;
      } else if (subtotal >= 50000) {
        return subtotal * 0.15;
      } else {
        return 0;
      }
    };
    