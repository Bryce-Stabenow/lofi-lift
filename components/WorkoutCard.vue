<template>
  <section class="mb-8 border rounded-md dark:border-gray-700">
    <div
      class="flex justify-between items-center border-b dark:border-gray-700 px-4 py-2 rounded-t-md border-l-4 !border-l-primary-400"
    >
      <h3 class="font-bold text-xl flex-1 truncate">{{ lift.name }}</h3>
      <p class="capitalize text-gray-400 dark:text-gray-700 ml-2">
        {{ lift.category }}
      </p>
    </div>
    <ul v-if="lift.category !== 'cardio'" class="p-4">
      <li v-if="lift.weight > 0">
        <span class="text-primary-400">Weight: </span>{{ lift.weight }}
      </li>
      <li>
        <span class="text-primary-400">Reps: </span>
        <template v-for="(rep, i) in lift.reps">
          <span v-if="rep > 0">
            {{ i === 0 ? rep : " - " + rep }}
          </span>
        </template>
      </li>
    </ul>
    <ul v-else class="p-4">
      <li><span class="text-primary-400">Intensity: </span>{{ lift.speed }}</li>
      <li><span class="text-primary-400">Minutes: </span>{{ lift.time }}</li>
    </ul>
    <div class="flex justify-end">
      <UButton
        size="sm"
        variant="ghost"
        color="white"
        icon="i-heroicons-pencil-square"
        @click="$emit('inspectLift', lift.id)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits(["deleteLift", "inspectLift"]);

defineProps({
  lift: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
