<template>
  <slot />
  <div class="p-4">
    <h2 class="font-bold text-4xl mt-6 mb-4">Timer:</h2>

    <!-- <div v-if="timerOn === false" class="flex gap-4">
      <div class="w-1/3">
        <label for="minutes" class="font-bold">Minutes:</label>
        <UInput
          v-model="minutes"
          class="w-full bg-inherit dark:bg-inherit mb-4"
          size="sm"
          type="number"
          color="primary"
          name="minutes"
          autocomplete="off"
        />
      </div>
      <div class="w-2/3">
        <label for="seconds" class="font-bold">Seconds:</label>
        <UInput
          v-model="seconds"
          class="w-full bg-inherit dark:bg-inherit mb-4"
          size="sm"
          type="number"
          color="primary"
          name="seconds"
          autocomplete="off"
        />
      </div>
    </div> -->

    <div class="mt-8">
      <span class="text-8xl text-center font-bold block">{{
        displayTime
      }}</span>

      <div class="flex justify-evenly mt-4 mb-2 gap-2">
        <UButton v-if="timerOn === false" @click="startTimer" size="xl" block
          >Start</UButton
        >
        <UButton v-else @click="stopTimer" size="xl" block variant="outline"
          >Stop</UButton
        >
      </div>
      <UButton @click="resetTimer" size="xl" block color="white" variant="link"
        >Reset</UButton
      >
    </div>
  </div>

  <div class="p-4 border-t dark:border-gray-800">
    <h2 class="font-bold text-4xl mt-12 mb-4">Rep Counter:</h2>
    <div class="flex flex-col items-center">
      <span class="font-bold text-8xl my-4">{{ repCount }}</span>
      <div class="flex flex-col gap-4 w-1/2">
        <UButton
          @click="addRep"
          block
          size="xl"
          icon="i-heroicons-plus"
        ></UButton>
        <UButton
          @click="removeRep"
          block
          size="xl"
          variant="outline"
          icon="i-heroicons-minus"
        ></UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const repCount = ref(0);
function addRep() {
  repCount.value++;
}
function removeRep() {
  if (repCount.value > 0) repCount.value--;
}

const timerOn = ref(false);
let interval: any = null;
let currentTime = ref(60);

const displayTime = computed(() => {
  let minutes = Math.floor(currentTime.value / 60).toString();
  let seconds = (currentTime.value % 60).toString();

  if (seconds.length < 2) {
    seconds = "0" + seconds;
  }

  return `${minutes}:${seconds}`;
});

function resetTimer() {
  timerOn.value = false;
  currentTime.value = 60;
}

function startTimer() {
  timerOn.value = true;
}

function stopTimer() {
  timerOn.value = false;
}

watch(timerOn, (val) => {
  if (val) {
    interval = setInterval(() => {
      currentTime.value = currentTime.value - 1;
    }, 1000);
  } else {
    clearInterval(interval);
  }
});
</script>
