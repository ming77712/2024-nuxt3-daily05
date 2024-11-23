<script setup>
const { $swal } = useNuxtApp();
const router = useRouter();

const userLoginObject = ref({
  email: '',
  password: '',
});

const loginAccount = async (requestBody) => {
  try {
    const { exp, token } = await $fetch('/v1/user/login', {
      method: 'POST',
      baseURL: 'https://nuxr3.zeabur.app/api',
      body: { ...requestBody },
    });

    const auth = useCookie('auth', {
      maxAge: exp,
    });

    auth.value = token;

    await $swal.fire({
      position: 'center',
      icon: 'success',
      title: '登入成功',
      showConfirmButton: false,
      timer: 1500,
    });
    router.push('/orders');
  } catch (error) {
    const { message } = error.response._data;
    await $swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
</script>

<template>
  <div class="py-3 py-md-5 vh-100">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <h2 class="h3 mb-4">登入</h2>
          <form @submit.prevent="loginAccount(userLoginObject)">
            <div class="form-floating mb-4">
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="userLoginObject.email"
                placeholder="example@gmail.com"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                required
              />
              <label for="email">信箱 <span class="text-danger">*</span></label>
            </div>

            <div class="form-floating mb-4">
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="userLoginObject.password"
                placeholder="請輸入 8 碼以上密碼"
                pattern=".{8,}"
                required
              />
              <label for="password"
                >密碼 <span class="text-danger">*</span></label
              >
            </div>
            <button class="btn btn-lg btn-primary w-100" type="submit">
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
