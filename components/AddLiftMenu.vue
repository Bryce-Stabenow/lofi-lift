<template>
  <slot />
  <h2 class="px-4 font-bold text-4xl mt-12 mb-6">Add A Lift:</h2>
  <form class="flex flex-col my-2 px-4" @submit.prevent="$emit('addLift')">
    <div>
      <label for="name" class="font-bold">Lift Name:</label>
      <UInput
        v-model="newLift.name"
        class="w-full bg-inherit dark:bg-inherit mb-4"
        size="xl"
        type="text"
        color="primary"
        name="name"
        autofocus
        required
        autocomplete="off"
      />

      <label for="category" class="font-bold">Category:</label>
      <USelect
        v-model="newLift.category"
        size="xl"
        :options="categories"
        color="primary"
        class="w-full mb-4"
        name="category"
        placeholder="Select Category"
        required
      >
      </USelect>
    </div>

    <div v-if="newLift.category !== 'Cardio'">
      <label for="weight" class="font-bold">Weight:</label>
      <UInput
        v-model="newLift.weight"
        class="w-full bg-inherit dark:bg-inherit mb-4"
        size="xl"
        type="number"
        color="primary"
        name="weight"
        autocomplete="off"
      />

      <label for="reps" class="font-bold">Reps:</label>
      <div class="flex gap-2">
        <UInput
          v-model="newLift.reps[0]"
          class="w-full bg-inherit dark:bg-inherit mb-4"
          size="xl"
          type="number"
          color="primary"
          name="reps"
          autocomplete="off"
        />
        <UInput
          v-model="newLift.reps[1]"
          class="w-full bg-inherit dark:bg-inherit mb-4"
          size="xl"
          type="number"
          color="primary"
          autocomplete="off"
        />
        <UInput
          v-model="newLift.reps[2]"
          class="w-full bg-inherit dark:bg-inherit mb-4"
          size="xl"
          type="number"
          color="primary"
          autocomplete="off"
        />
        <UInput
          v-model="newLift.reps[3]"
          class="w-full bg-inherit dark:bg-inherit mb-4"
          size="xl"
          type="number"
          color="primary"
          autocomplete="off"
        />
        <UInput
          v-model="newLift.reps[4]"
          class="w-full bg-inherit dark:bg-inherit mb-4"
          size="xl"
          type="number"
          color="primary"
          autocomplete="off"
        />
      </div>
    </div>

    <div v-else>
      <label for="time" class="font-bold">Time:</label>
      <UInput
        v-model="newLift.time"
        class="w-full bg-inherit dark:bg-inherit mb-4"
        size="xl"
        type="number"
        color="primary"
        name="time"
        autocomplete="off"
      />

      <label for="speed" class="font-bold">Speed/Intensity:</label>
      <UInput
        v-model="newLift.speed"
        class="w-full bg-inherit dark:bg-inherit mb-4"
        size="xl"
        type="number"
        color="primary"
        name="speed"
        autocomplete="off"
      />
    </div>

    <div class="flex place-self-end w-1/2 mt-2">
      <UButton type="submit" block size="xl"> Add </UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
defineEmits(["addLift"]);

defineProps({
  newLift: {
    type: Object,
    required: true,
  },
  categories: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
