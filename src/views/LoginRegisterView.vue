<template>
  <div id="login" class="max-w-xs m-auto">
    <PasswordReset
      class="w-screen h-screen z-10 absolute bg-black top-0 left-0 p-4"
      v-if="showPasswordReset"
      @close="togglePasswordReset"
    ></PasswordReset>
    <section>
      <h1 class="text-3xl">
        <img class="pr-2 inline-block" src="/favicon-32x32.png" />Topple
      </h1>
      <p class="my-3">Let's knock over that debt mountain.</p>
      <hr class="my-3" />
      <form v-if="showLoginForm" @submit.prevent="login">
        <h1 class="my-2 text-xl">Welcome Back!</h1>
        <div class="flex flex-col my-2">
          <label class="text-lg" for="email1"
            >Email
            <span class="float-right text-gray-400 text-sm italic"
              >i.e. you@email.com</span
            ></label
          >
          <input
            class="
              w-full
              px-1
              text-gray-900
              border-solid border-2 border-white
              focus:border-green-400
            "
            v-model.trim="loginForm.email"
            type="email"
            required
            id="email1"
          />
        </div>
        <div class="flex flex-col my-2">
          <label class="text-lg" for="password1">Password</label>
          <input
            class="
              w-full
              px-1
              text-gray-900
              border-solid border-2 border-white
              focus:border-green-400
            "
            v-model.trim="loginForm.password"
            type="password"
            required
            id="password1"
          />
        </div>
        <p v-if="errorMessage !== ''" class="my-2 text-red-600 text-sm">
          {{ errorMessage }}
        </p>
        <div class="flex justify-between">
          <button
            type="submit"
            class="bg-green-500 text-white px-2 py-1 my-2 text-lg"
          >
            Log In
          </button>
          <a
            class="
              button
              border-gray-200 border-solid border-2
              px-1
              py-1
              my-2
              text-lg
              cursor-pointer
            "
            @click="toggleForm"
            >Create an Account</a
          >
        </div>
        <div class="extras my-4 flex flex-col items-center">
          <a class="cursor-pointer underline" @click="togglePasswordReset"
            >Forgot Password?</a
          >
        </div>
      </form>
      <form v-else @submit.prevent="signup">
        <h1 class="my-2 text-xl">Get Started</h1>
        <div class="flex flex-col my-2">
          <label class="text-lg" for="name">Name</label>
          <input
            required
            class="
              w-full
              px-1
              text-gray-900
              border-solid border-2 border-white
              focus:border-green-400
            "
            v-model.trim="signupForm.name"
            type="text"
            id="name"
          />
        </div>
        <div class="flex flex-col my-2">
          <label class="text-lg" for="email2"
            >Email<span class="float-right text-gray-400 text-sm italic"
              >i.e. you@email.com</span
            ></label
          >
          <input
            required
            class="
              w-full
              px-1
              text-gray-900
              border-solid border-2 border-white
              focus:border-green-400
            "
            v-model.trim="signupForm.email"
            type="text"
            id="email2"
          />
        </div>
        <div class="flex flex-col my-2">
          <label class="text-lg" for="password2"
            >Password<span class="float-right text-gray-400 text-sm italic"
              >8 character min.</span
            ></label
          >
          <input
            required
            class="
              w-full
              px-1
              text-gray-900
              border-solid border-2 border-white
              focus:border-green-400
            "
            v-model.trim="signupForm.password"
            type="password"
            id="password2"
          />
        </div>
        <div class="flex justify-between">
          <button
            class="bg-green-500 text-white px-2 py-1 my-2 text-lg"
            type="submit"
          >
            Sign Up
          </button>
          <a
            class="
              button
              border-gray-200 border-solid border-2
              px-2
              py-1
              my-2
              text-lg
              cursor-pointer
            "
            @click="toggleForm"
            >Back to Log In</a
          >
        </div>
      </form>
    </section>
  </div>
</template>

<style></style>

<script lang="ts">
import { defineComponent } from "vue";
import PasswordReset from "@/components/PasswordReset.vue";
import { ACTIONS } from "../data";

export default defineComponent({
  name: "LoginRegisterView",
  components: {
    PasswordReset
  },
  data() {
    return {
      errorMessage: "",
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        name: "",
        email: "",
        password: ""
      },
      showLoginForm: true,
      showPasswordReset: false
    };
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.$store
        .dispatch(ACTIONS.login, {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
        .then((err: string) => {
          console.log(err);
          if (err) {
            this.errorMessage = err;
          } else {
            this.errorMessage = "";
          }
        })
        .catch((err: any) => {
          console.error(err);
        });
    },
    signup() {
      this.$store.dispatch(ACTIONS.signup, {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name
      });
    }
  }
});
</script>
