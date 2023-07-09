<template>
  <div class="flex justify-end -mb-2">
    <UButton
      size="sm"
      variant="ghost"
      color="red"
      icon="i-heroicons-outline-trash"
      @click="$emit('deleteLift', lift.id)"
    />
  </div>
  <form class="flex flex-col mb-2 px-4" @submit.prevent="$emit('updateLift')">
    <div>
      <label for="name" class="font-bold">Lift Name:</label>
      <UInput
        v-model="lift.name"
        class="w-full bg-inherit dark:bg-inherit mb-4"
        size="xl"
        type="text"
        color="primary"
        name="name"
        required
        autocomplete="off"
      />

      <label for="category" class="font-bold">Category:</label>
      <USelect
        v-model="lift.category"
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

    <div v-if="lift.category !== 'Cardio'">
      <label for="weight" class="font-bold">Weight:</label>
      <UInput
        v-model="lift.weight"
        class="w-full bg-inherit dark:bg-inherit mb-4"
        size="xl"
        type="number"
        color="primary"
        name="weight"
        autocomplete="off"
      />

      <label for="reps" class="font-bold">Reps:</label>
      <div class="grid grid-cols-3 flex-wrap gap-2">
        <UInput
          v-model="lift.reps[0]"
          class="bg-inherit dark:bg-inherit"
          size="xl"
          type="number"
          color="primary"
          name="reps"
          autocomplete="off"
        />
        <UInput
          v-model="lift.reps[1]"
          class="bg-inherit dark:bg-inherit"
          size="xl"
          type="number"
          color="primary"
          autocomplete="off"
        />
        <UInput
          v-model="lift.reps[2]"
          class="bg-inherit dark:bg-inherit"
          size="xl"
          type="number"
          color="primary"
          autocomplete="off"
        />
        <UInput
          v-model="lift.reps[3]"
          class="bg-inherit dark:bg-inherit"
          size="xl"
          type="number"
          color="primary"
          autocomplete="off"
        />
        <UInput
          v-model="lift.reps[4]"
          class="bg-inherit dark:bg-inherit"
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
        v-model="lift.time"
        class="w-full bg-inherit dark:bg-inherit mb-4"
        size="xl"
        type="number"
        color="primary"
        name="time"
        autocomplete="off"
      />

      <label for="speed" class="font-bold">Speed/Intensity:</label>
      <UInput
        v-model="lift.speed"
        class="w-full bg-inherit dark:bg-inherit mb-4"
        size="xl"
        type="number"
        color="primary"
        name="speed"
        autocomplete="off"
      />
    </div>

    <div class="flex place-self-end w-1/2 mt-6">
      <UButton type="submit" block size="xl"> Update </UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
defineEmits(["updateLift", "deleteLift"]);

defineProps({
  lift: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped></style>
