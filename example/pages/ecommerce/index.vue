<script setup lang="ts">
import type { PaymentInformation, Product } from "@piwikpro/nuxt-piwik-pro";
import { ref } from "vue";

import { products } from "~/data/ecommerce";

const toastMessage = ref("");
const isToastVisible = ref(false);
const pageData = {
  title: "ECommerce",
};

const showToast = (message: string) => {
  toastMessage.value = message;
  isToastVisible.value = true;
};

const isModalVisible = ref<boolean>(false);
const chosenProduct = ref<Product | null>(null);

const { $piwikPRO } = useNuxtApp();

const cart = ref<Product[]>([]);

const handleAddToCart = (product: Product) => {
  $piwikPRO.eCommerce.ecommerceAddToCart(
    [
      {
        ...product,
        quantity: 1,
      },
    ],
    { currencyCode: "USD" }
  );

  showToast("eCommerce.ecommerceAddToCart()");

  if (cart.value.some((item) => item.sku === product.sku)) {
    cart.value = cart.value.map((item) => {
      if (item.sku === product.sku) {
        return {
          ...item,
          quantity: item.quantity ? item.quantity + 1 : 1,
        };
      }
      return item;
    });
    return;
  }

  cart.value = [
    ...cart.value,
    {
      ...product,
      quantity: 1,
    },
  ];
};

const handleRemoveFromCart = (product: Product) => {
  showToast("eCommerce.ecommerceRemoveFromCart()");

  $piwikPRO.eCommerce.ecommerceRemoveFromCart(
    [
      {
        ...product,
        quantity: 1,
      },
    ],
    { currencyCode: "USD" }
  );
  cart.value = cart.value.filter((item) => item.sku !== product.sku);
};

const handleCheckout = () => {
  if (!cart.value.length) {
    alert("Please add some products to the cart first");
    return;
  }

  const subTotal = cart.value.reduce((acc, product) => {
    if (product.price) {
      return acc + product.price;
    }
    return acc;
  }, 0);

  const tax = 10;
  const shipping = 4;
  const discount = 5;

  const paymentInformation: PaymentInformation = {
    orderId: "order-123",
    grandTotal: subTotal + tax + shipping - discount,
    subTotal,
    tax,
    shipping,
    discount,
  };

  showToast("eCommerce.ecommerceOrder()");
  $piwikPRO.eCommerce.ecommerceOrder(cart.value, paymentInformation, {
    currencyCode: "USD",
  });
};

const handleShowProductDetails = (product: Product) => {
  isModalVisible.value = true;
  chosenProduct.value = product;
  $piwikPRO.eCommerce.ecommerceProductDetailView([product], {
    currencyCode: "USD",
  });
  showToast("eCommerce.ecommerceProductDetailView()");
};
</script>

<template>
  <Head>
    <Title>{{ pageData.title }}</Title>
  </Head>
  <div class="columns-2">
    <div class="card bg-base-100 shadow-xl inventory">
      <div class="card-body">
        <h2 class="card-title">Inventory</h2>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Show Details</th>
                <th>Add to cart</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.sku">
                <th>{{ product.sku }}</th>
                <td>{{ product.name }}</td>
                <td>
                  <button
                    class="btn btn-sm"
                    @click="handleShowProductDetails(product)"
                  >
                    details
                  </button>
                </td>
                <td>
                  <button class="btn btn-sm" @click="handleAddToCart(product)">
                    add to cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl cart">
      <div class="card-body">
        <h2 class="card-title">Cart</h2>
        <div v-if="cart.length" class="overflow-x-auto mb-5">
          <table class="table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Remove from cart</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in cart" :key="product.sku">
                <th>{{ product.sku }}</th>
                <td>{{ product.name }}</td>
                <td>{{ product.quantity }}</td>
                <td>
                  <button
                    class="btn btn-sm"
                    @click="handleRemoveFromCart(product)"
                  >
                    remove from cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 v-else>Cart is empty</h2>
        <div v-if="cart.length" class="card-actions justify-end">
          <button class="btn btn-sm" @click="handleCheckout()">
            Make order
          </button>
        </div>
      </div>
    </div>
  </div>

  <Modal v-model="isModalVisible" name="product-details">
    <ProductDetails v-if="chosenProduct" :product="chosenProduct" />
  </Modal>
  <Toast v-model="isToastVisible" :message="toastMessage" />
</template>

<style scoped></style>
