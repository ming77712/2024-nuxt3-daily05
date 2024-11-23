export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useCookie('auth');
  if (!auth.value) return navigateTo('/login');

  try {
    const userInfo = await $fetch('/v1/user/check', {
      method: 'GET',
      baseURL: 'https://nuxr3.zeabur.app/api',
      headers: {
        Authorization: auth.value,
      },
    });

    if (userInfo?.status !== undefined) {
      return;
    } else {
      return navigateTo('/login');
    }
  } catch (error) {
    return navigateTo('/login');
  }
});
