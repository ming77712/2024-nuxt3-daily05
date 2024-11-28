export const useBookingStore = defineStore('booking', () => {
  // 定義 state
  const bookingResult = ref({});

  // 回傳 store 的 state, actions 和 getters ，供外部取用
  return {
    bookingResult,
  };
});
