<script setup>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const { isLoading, newsList, getData } = useHome();
const { $bootstrapModal, $bootstrapOffcanvas } = useNuxtApp();

const modalRef = ref(null);
let modal;
const showModal = () => {
  modal.show();
};
const closeModal = () => {
  modal.hide();
};

const offcanvasRef = ref(null);
let offcanvas;
const showOffcanvas = () => {
  offcanvas.show();
};
const closeOffcanvas = () => {
  offcanvas.hide();
};

onMounted(() => {
  getData();
  modal = $bootstrapModal(modalRef.value, {
    keyboard: false,
  });
  offcanvas = $bootstrapOffcanvas(offcanvasRef.value, {
    keyboard: false,
    backdrop: false,
  });
});
</script>

<template>
  <div class="container">
    <h1>最新消息</h1>
    <NewsCard v-for="news in newsList" :key="news._id" v-bind="news" />

    <ClientOnly>
      <Loading v-model:active="isLoading" />
    </ClientOnly>

    <button type="button" class="btn btn-primary" @click="showModal">
      開啟 Modal
    </button>

    <button type="button" class="btn btn-secondary" @click="showOffcanvas">
      開啟 Offcanvas
    </button>

    <!-- modal 元件 -->
    <div
      class="modal fade"
      id="staticBackdrop"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Modal title
            </h1>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Offcanvas  元件 -->
    <div
      class="offcanvas offcanvas-bottom"
      tabindex="-1"
      id="offcanvasBottom"
      aria-labelledby="offcanvasBottomLabel"
      ref="offcanvasRef"
    >
      <div class="offcanvas-header">
        <h3 class="offcanvas-title" id="offcanvasBottomLabel">
          Offcanvas bottom
        </h3>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeOffcanvas"
        ></button>
      </div>
      <div class="offcanvas-body small">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eius
        perferendis illum cum vero cumque totam repudiandae accusantium facere
        est
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
