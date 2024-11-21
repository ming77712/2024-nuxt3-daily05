<script setup>
const route = useRoute();
const router = useRouter();

// const roomDetail = ref({});

const { id } = route.params;

const { data: roomDetail } = await useFetch(`/rooms/${id}`, {
  baseURL: 'https://nuxr3.zeabur.app/api/v1',
  transform: (response) => {
    const { result } = response;
    return result;
  },
  onResponseError({ response }) {
    const { message } = response._data;
    console.error('Error:', message);
    router.push('/');
  },
});

const isProvide = function (isProvideBoolean = false) {
  return isProvideBoolean ? '提供' : '未提供';
};

// const getRoomDetail = async () => {
//   try {
//     const response = await fetch(apiURL);

//     if (!response.ok) {
//       throw new Error('取得房型詳細資料失敗');
//     }

//     const { result } = await response.json();
//     roomDetail.value = result;
//   } catch (error) {
//     console.error('發生錯誤:', error);
//   }
// };

// useSeoMeta({
//   title: roomDetail.value.name,
//   titleTemplate: (title) => `Freyja | ${title}`,
//   description: () => roomDetail.value.description,
//   ogTitle: () => `Freyja | ${roomDetail.value.name}`,
//   ogDescription: () => roomDetail.value.description,
//   ogImage: () => roomDetail.value.imageUrl,
//   ogUrl: () => `https://freyja.travel.com.tw/room/${roomDetail.value.id}`,
//   twitterCard: 'summary_large_image',
//   twitterTitle: () => `Freyja | ${roomDetail.value.name}`,
//   twitterDescription: () => roomDetail.value.description,
//   twitterImage: () => roomDetail.value.imageUrl,
// });

const title = ref(`Freyja | ${roomDetail.value.name}`);
const description = ref(roomDetail.value.description);
const socialMediaTitle = computed(() => `Freyja | ${roomDetail.value.name}`);
const socialMediaDescription = computed(() => roomDetail.value.description);
const socialMediaImage = computed(() => roomDetail.value.imageUrl);
const fbMediaUrl = ref(
  `https://freyja.travel.com.tw/room/${roomDetail.value.id}`
);
const twitterMediaCard = ref('summary_large_image');

// onMounted(() => {
//   getRoomDetail();
// });
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta property="og:title" :content="socialMediaTitle" />
    <Meta property="og:description" :content="socialMediaDescription" />
    <Meta property="og:image" :content="socialMediaImage" />
    <Meta property="og:url" :content="fbMediaUrl" />
    <Meta name="twitter:card" :content="twitterMediaCard" />
    <Meta name="twitter:title" :content="socialMediaTitle" />
    <Meta name="twitter:description" :content="socialMediaDescription" />
    <Meta name="twitter:image" :content="socialMediaImage" />
    <!-- <NoScript
      >此網頁需要支援 JavaScript 才能正確運行，請先至你的瀏覽器設定中開啟
      JavaScript。</NoScript
    >
    <Style type="text/css"> body { background-color: #f0f0f0; } </Style>
    <Link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    /> -->
  </Head>

  <h2>房型詳細頁面</h2>

  <div class="container">
    <button @click="router.go(-1)">回上一頁</button>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="room-page">
          <div class="room-header">
            <h1 class="room-name">{{ roomDetail.name }}</h1>
            <p class="room-description">
              {{ roomDetail.description }}
            </p>
          </div>

          <div class="room-gallery">
            <img
              :src="roomDetail.imageUrl"
              alt="尊爵雙人房主圖"
              class="room-main-image"
            />
            <div class="room-image-list">
              <img
                v-for="(image, index) in roomDetail.imageUrlList"
                :key="index"
                :src="image"
              />
            </div>
          </div>

          <div class="room-info">
            <div class="info-block">
              <h2>房間資訊</h2>
              <p>面積: {{ roomDetail.areaInfo }}</p>
              <p>床型: {{ roomDetail.bedInfo }}</p>
              <p>最多容納人數: {{ roomDetail.maxPeople }}</p>
              <p>價格: NT${{ roomDetail.price }}</p>
            </div>

            <div class="info-block">
              <h2>房間配置</h2>
              <ul>
                <li v-for="item in roomDetail.layoutInfo">
                  {{ item.title }}: {{ item.isProvide ? '提供' : '不提供' }}
                </li>
              </ul>
            </div>

            <div class="info-block">
              <h2>房內設施</h2>
              <ul>
                <li v-for="item in roomDetail.facilityInfo">
                  {{ item.title }}: {{ item.isProvide ? '提供' : '不提供' }}
                </li>
              </ul>
            </div>

            <div class="info-block">
              <h2>客房備品</h2>
              <ul>
                <li v-for="item in roomDetail.amenityInfo">
                  {{ item.title }}: {{ item.isProvide ? '提供' : '不提供' }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.room-page {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.room-header {
  text-align: center;
  margin-bottom: 30px;
}

.room-name {
  font-size: 2rem;
  color: #333;
}

.room-description {
  font-size: 1rem;
  color: #666;
}

.room-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.room-main-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.room-image-list {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.room-image-list img {
  width: 100px;
  height: auto;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s;
}

.room-image-list img:hover {
  transform: scale(1.1);
}

.room-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-block {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
}

.info-block h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #444;
}

.info-block p,
.info-block ul {
  font-size: 1rem;
  color: #555;
}

.info-block ul {
  list-style: none;
  padding-left: 0;
}

.info-block ul li {
  margin-bottom: 5px;
}
</style>
