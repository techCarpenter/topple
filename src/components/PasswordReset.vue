<template>
  <div id="reset-modal">
    <div class="modal-content max-w-xs m-auto">
      <h3 class="text-3xl">Reset Password</h3>
      <div v-if="!showSuccess">
        <form @submit.prevent="resetPassword">
          <label class="my-2 text-lg" for="reset-email">Email</label>
          <input
            class="w-full py-1 px-2 my-2 text-gray-900"
            v-model.trim="email"
            type="email"
            placeholder="you@email.com"
            required
            id="reset-email"
          />

          <p v-if="errorMsg !== ''" class="text-red-600">{{ errorMsg }}</p>
          <div class="flex justify-between">
            <button type="submit" class="button primary px-2 py-1 my-2 text-lg">
              Reset
            </button>
            <a
              @click="$emit('close')"
              class="
                button
                border-gray-200 border-solid border-2
                px-2
                py-1
                my-2
                text-lg
                cursor-pointer
              "
              >Cancel</a
            >
          </div>
        </form>
      </div>
      <p v-else class="text-green-400">
        Success! Check your email for a reset link.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#reset-modal {
  background-color: $background-color;
}
.button.primary {
  background-color: $theme-color;
  color: white;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { auth } from "../firebase";

export default defineComponent({
  data() {
    return {
      email: "",
      showSuccess: false,
      errorMsg: ""
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = "";
      console.log("resetting password");
      await auth
        .sendPasswordResetEmail(this.email, {
          url: "https://localhost:8080",
          handleCodeInApp: true
        })
        .then(() => {
          this.showSuccess = true;
        })
        .catch((err: any) => {
          this.errorMsg = err.message;
        });
    }
  }
});
</script>
