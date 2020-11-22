<template>
  <router-link class="nav-link" :to="path">
    <div class="icon-container">
      <svg
        class="nav-icon"
        :class="{ mirror: icon === 'logout' }"
        viewBox="0 0 24 24"
      >
        <path
          v-if="icon === 'home'"
          fill="currentColor"
          d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
        />
        <path
          v-else-if="icon === 'bank'"
          fill="currentColor"
          d="M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z"
        />
        <path
          v-else-if="icon === 'settings'"
          fill="currentColor"
          d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
        />
        <path
          v-else-if="icon === 'creditcard'"
          fill="currentColor"
          d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
        />
        <path
          v-else-if="icon === 'chart'"
          fill="currentColor"
          d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z"
        />
        <path
          v-else-if="icon === 'logout'"
          fill="currentColor"
          d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"
        />
        <path
          v-else-if="icon === 'account'"
          fill="currentColor"
          d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M16.5,16.25C16.5,14.75 13.5,14 12,14C10.5,14 7.5,14.75 7.5,16.25V17H16.5M12,12.25A2.25,2.25 0 0,0 14.25,10A2.25,2.25 0 0,0 12,7.75A2.25,2.25 0 0,0 9.75,10A2.25,2.25 0 0,0 12,12.25Z"
        />
      </svg>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "NavBarItem",
  props: {
    icon: {
      required: true,
      type: String,
      validator: () => {
        return /^home|bank|creditcard|chart|settings|account|logout$/;
      }
    },

    path: {
      default: "/",
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-link {
  display: block;
  &:hover {
    background-color: lighten($color: $background-color, $amount: 15);
  }
}
.icon-container {
  width: 100%;
  padding: 0.75rem 1.25rem;
  margin: 0;
  padding-left: 26px;
}
.nav-icon {
  width: 30px;
  height: 30px;
  color: $foreground-color;
}
.router-link-active .icon-container {
  border-left: 6px solid $theme-color;
  padding-left: 20px;
  & > .nav-icon {
    color: $theme-color;
  }
}
.mirror {
  transform: rotate(180deg);
}
</style>
