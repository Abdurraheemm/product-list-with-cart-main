import { useState } from 'react';

const menuItems = [
  {
    id: 1,
    name: 'Waffle with Berries',
    category: 'Waffle',
    price: 6.5,
    action: 'Add to Cart',
    photo: '/assets/images/image-baklava-desktop.jpg',
  },
  {
    id: 2,
    name: 'Vanilla Bean Crème Brûlée',
    category: 'Crème Brûlée',
    price: 7.0,
    action: 'Add to Cart',
    photo: '/assets/images/image-brownie-desktop.jpg',
  },
  {
    id: 3,
    name: 'Macaron Mix of Five',
    category: 'Macaron',
    price: 8.0,
    action: 'Add to Cart',
    photo: '/assets/images/image-cake-desktop.jpg',
  },
  {
    id: 4,
    name: 'Classic Tiramisu',
    category: 'Tiramisu',
    price: 5.5,
    action: 'Add to Cart',
    photo: '/assets/images/image-creme-brulee-desktop.jpg',
  },
  {
    id: 5,
    name: 'Pistachio Baklava',
    category: 'Baklava',
    price: 4.0,
    action: 'Add to Cart',
    photo: '/assets/images/image-macaron-desktop.jpg',
  },
  {
    id: 6,
    name: 'Lemon Meringue Pie',
    category: 'Pie',
    price: 5.0,
    action: 'Add to Cart',
    photo: '/assets/images/image-meringue-desktop.jpg',
  },
  {
    id: 7,
    name: 'Red Velvet Cake',
    category: 'Cake',
    price: 4.5,
    action: 'Add to Cart',
    photo: '/assets/images/image-panna-cotta-desktop.jpg',
  },
  {
    id: 8,
    name: 'Salted Caramel Brownie',
    category: 'Brownie',
    price: 4.5,
    action: 'Add to Cart',
    photo: '/assets/images/image-tiramisu-desktop.jpg',
  },
  {
    id: 9,
    name: 'Vanilla Panna Cotta',
    category: 'Panna Cotta',
    price: 6.5,
    action: 'Add to Cart',
    photo: '/assets/images/image-waffle-desktop.jpg',
  },
];

export default function App() {
  const [items, setItems] = useState([]);
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="md: flex w-full flex-col items-center justify-center md:flex-row md:items-start">
      <Menu items={items} setItems={setItems} />
      <AddCart items={items} onHandleDelete={handleDelete} />
    </div>
  );
}

function Menu({ items, setItems }) {
  const newItems = menuItems;

  return (
    <div>
      <main className="py-12">
        <h1 className="mb-6 text-5xl font-semibold">Desserts</h1>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {newItems.map((item) => (
            <ListItems
              listobj={item}
              items={items}
              setItems={setItems}
              item
              key={item.id}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

function ListItems({ listobj, items, setItems }) {
  // const [isAdded, setIsAdded] = useState(false);
  const itemInCart = items.find((item) => item.id === listobj.id);
  const itemCount = itemInCart ? itemInCart.count : 0;
  function handleAddItems(newItem) {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.name === newItem.name,
      );

      if (existingItemIndex !== -1) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, count: item.count + 1 }
            : item,
        );
      } else {
        return [...prevItems, { ...newItem, count: 1 }];
      }
    });
  }
  function handleClick(id, name, price) {
    if (!itemInCart) {
      const newItem = { id: id, name: name, price: price };
      handleAddItems(newItem);
    }
  }

  function handleDecrement() {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === listobj.id ? { ...item, count: item.count - 1 } : item,
        )
        .filter((item) => item.count > 0),
    );
  }

  function handleIncrement() {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === listobj.id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  }

  return (
    <li className="list">
      <div className="cart relative mb-9">
        <img
          src={listobj.photo}
          alt="itemphoto"
          className={
            itemCount > 0
              ? 'border- w-[250px] rounded-lg border-[3px] border-orange-600'
              : 'w-[250px] rounded-lg'
          }
        />

        <button
          onClick={() => handleClick(listobj.id, listobj.name, listobj.price)}
          style={{
            backgroundColor: itemCount > 0 ? 'hsl(14, 86%, 42%)' : 'white',
            color: itemCount > 0 ? 'white' : 'hsl(14, 86%, 42%)',
          }}
          className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 rounded-full"
        >
          {itemCount > 0 ? (
            <div className="flex items-center justify-center gap-6 p-2">
              <img
                src="./assets/images/icon-decrement-quantity.svg"
                alt="minus-symbol"
                onClick={handleDecrement}
                className="rounded-full border p-2 py-3"
              />

              <span className="text-sm">{itemCount}</span>
              <img
                src="./assets/images/icon-increment-quantity.svg"
                alt="minus-symbol"
                onClick={handleIncrement}
                className="rounded-[50%] border p-2"
              />
            </div>
          ) : (
            <div className="flex gap-1 rounded-full border border-orange-700 p-2">
              <img src="./assets/images/icon-add-to-cart.svg" alt="iconimage" />
              <span className="text-sm font-semibold text-red-900">
                {listobj.action}
              </span>
            </div>
          )}
        </button>
      </div>
      <div>
        <p className="text-sm text-[#ad8985]">{listobj.category}</p>
        <h3 className="font-bold text-orange-900">{listobj.name}</h3>
        <span className="font-semibold text-orange-600">$ {listobj.price}</span>
      </div>
    </li>
  );
}

function AddCart({ items, onHandleDelete }) {
  const [showModal, setShowModal] = useState(false);
  const orderTotal = items.reduce(
    (total, item) => total + item.count * item.price,
    0,
  );
  function handleConfirmOrder() {
    setShowModal(true);
  }
  function handleReload() {
    window.location.reload();
  }
  return (
    <div className="mb-6 h-fit w-[350px] rounded-xl bg-white p-6 md:ml-9 md:mt-16">
      <h3 className="pb-3 text-2xl font-semibold text-red-700">
        Your Cart ({items.length})
      </h3>
      {items.length > 0 ? (
        <div>
          <main>
            <div>
              {items.map((item, index) => (
                <CartItems
                  itemsobj={item}
                  onHandleDelete={onHandleDelete}
                  key={index}
                />
              ))}
            </div>
            <div className="mb-3 flex justify-between">
              <p>Order Total</p>
              <span className="text-xl font-bold">
                ${orderTotal.toFixed(2)}
              </span>
            </div>
            <div className="mb-6 flex justify-center gap-3 rounded-md bg-orange-50 p-2">
              <img
                src="./assets/images/icon-carbon-neutral.svg"
                alt="tree-image"
              />
              <p>
                This is a <span>carbon-neutral</span> delivery
              </p>
            </div>
            <button
              className="w-full rounded-full bg-red-600 py-2 text-white hover:bg-red-700"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </main>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="./assets/images/illustration-empty-cart.svg"
            alt="cakeimage"
          />
          <p>Your added items will appear here</p>
        </div>
      )}
      {showModal && (
        <OrderConfirmationModal
          items={items}
          handleReload={handleReload}
          total={orderTotal}
        />
      )}
    </div>
  );
}

function CartItems({ itemsobj, onHandleDelete }) {
  return (
    <div className="mb-5 flex items-center justify-between border-b border-gray-300">
      <div>
        <h4>{itemsobj.name}</h4>
        <div className="flex gap-2 pb-2">
          <span className="text-orange-600">{itemsobj.count}x </span>
          <span>@ ${itemsobj.price} </span>
          <span> ${itemsobj.count * itemsobj.price}</span>
        </div>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => onHandleDelete(itemsobj.id)}
      >
        <img
          src="./assets/images/icon-remove-item.svg"
          alt="remove item"
          className="rounded-full border border-[#caafa7] p-1"
        />
      </div>
    </div>
  );
}
function OrderConfirmationModal({ items, total, handleReload }) {
  return (
    <div className="bg-[rgba(0, 0, 0, 0.5)] fixed left-0 top-0 flex h-[100%] w-[100%] items-center justify-center p-3">
      <div className="max-w-[500px] rounded-lg bg-white p-6">
        <div className="mb-3">
          <img
            src="./assets/images/icon-order-confirmed.svg"
            alt="confrimed-image"
            className="mb-3"
          />
          <h2 className="text-3xl font-bold">Order Confirmed</h2>
          <p className="text-sm text-orange-900">
            We hope you enjoy your food!
          </p>
        </div>
        <div className="mb-3 rounded-md bg-orange-50 p-3">
          <ul className="mb-3">
            {items.map((item, index) => (
              <li
                key={index}
                className="mb-3 flex items-center justify-between gap-9 border-b"
              >
                <div className="flex items-center gap-2">
                  <div>
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-9 rounded-sm"
                      // style={{ width: "50px", height: "auto" }}
                    />
                  </div>

                  <div>
                    <h4>{item.name}</h4>
                    <p className="text-sm">
                      <span>{item.count}x</span> @ ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-sm">
                    ${(item.count * item.price).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <p>Order Total</p>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={handleReload}
          className="w-full rounded-full bg-red-600 py-2 text-white hover:bg-red-700"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}
