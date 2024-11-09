export const useHome = () => {
  const isLoading = ref(false);
  const newsList = ref([]);
  const url = 'https://nuxr3.zeabur.app/api/v1/home/news/';

  const getData = async () => {
    try {
      isLoading.value = true;
      const response = await fetch(url);

      if (!response.ok) {
        alert(response.status);
        return;
      }

      const { result } = await response.json();
      newsList.value = result;
    } catch (error) {
      alert(error.message);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    newsList,
    getData,
  };
};
