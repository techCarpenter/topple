<template>
  <div
    class="
      flex flex-col
      min-block-width
      justify-between
      items-center
      border-2
      py-2
      px-3
      mb-3
      border-white
    "
  >
    <h3 class="text-2xl">
      {{ title }}{{ type === "progress" ? ` (${value.toString()}%)` : "" }}
    </h3>
    <p v-if="type !== 'progress'" class="text-lg mt-2">{{ value }}</p>
    <div
      v-if="type === 'progress'"
      class="bg-gray-800 border-gray-200 border-solid border-2 w-full mt-2"
    >
      <div
        class="bg-green-500"
        :style="`height:25px;width:${value.toString()}%;`"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaydownStatBlock",
  props: {
    type: {
      type: String,
      default: "text",
      validator: (value: string) => ["text", "progress"].includes(value)
    },
    value: {
      required: true,
      default: ""
    },
    title: {
      type: String,
      required: true,
      default: ""
    }
  }
});
</script>

<style>
.min-block-width {
  width: 100%;
}
@media screen and (min-width: 515px) {
  .min-block-width {
    width: 49%;
  }
}
</style>
