<script setup>
const { newsList, getData } = useHome();
const { $bootstrapModal, $bootstrapOffcanvas, $useLoading } = useNuxtApp();

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

const message = ref('A1B2c3deFGhijk');
const time = ref(1730427600000);

const loadingHandler = $useLoading({
  backgroundColor: 'green',
  loader: 'dots',
  'is-full-page': false,
});

function openLoading() {
  const loader = loadingHandler.show();
  setTimeout(() => {
    loader.hide();
  }, 1000);
}

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
      <button type="button" @click="openLoading">開啟 Loading 效果</button>
    </ClientOnly>

    <button type="button" class="btn btn-primary" @click="showModal">
      開啟 Modal
    </button>

    <button type="button" class="btn btn-secondary" @click="showOffcanvas">
      開啟 Offcanvas
    </button>

    <h2>自訂英文文字大小寫轉換指令</h2>
    <!-- 大寫轉小寫格式之後，將結果寫入元素 -->
    <p v-textformat:lowercase="message"></p>

    <!-- 小寫轉大寫格式之後，將結果寫入元素 -->
    <p v-textformat:uppercase="message"></p>

    <h2>自訂時間轉換指令</h2>
    <!-- 使用 plugins/timeformat.js 建立的指令，將變數 time 的時間戳帶入 -->
    <!-- 轉換成 yyyy-mm-dd hh:mm:ss 格式之後將結果寫入元素 -->
    <!-- 1730427600000 => 轉換成 yyyy-mm-dd hh:mm:ss  -->
    <p v-timeformat="time"></p>

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
