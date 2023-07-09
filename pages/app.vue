<template>
  <div class="w-full mt-20">
    <nav class="flex items-center mb-6">
      <ul
        class="flex w-full justify-between dark:border-gray-800 border-b mb-2 gap-1"
      >
        <template v-for="cat in categories">
          <li
            class="font-bold text-primary-400 text-lg text-center flex-1 rounded-t-md cursor-pointer"
            :class="[
              currentCategory === cat ? 'bg-gray-300 dark:bg-gray-800' : '',
            ]"
            @click="currentCategory = cat"
          >
            {{ cat }}
          </li>
        </template>
      </ul>
    </nav>

    <span
      v-if="filteredLifts.length === 0"
      class="block text-center text-gray-700"
      >No workouts for {{ currentCategory }}</span
    >

    <template v-for="lift in filteredLifts">
      <WorkoutCard :lift="lift" @delete-lift="deleteLift(lift.id)" />
    </template>

    <USlideover :modelValue="addMenuOpen">
      <AddLiftMenu
        :newLift="newLift"
        :categories="categories"
        @add-lift="addLift"
      >
        <div class="flex justify-start pl-2 pt-2">
          <UButton
            @click="addMenuOpen = false"
            variant="link"
            icon="i-heroicons-arrow-right"
          ></UButton>
        </div>
      </AddLiftMenu>
    </USlideover>

    <USlideover :modelValue="timerMenuOpen" side="left">
      <TimerMenu>
        <div class="flex justify-end pr-2 pt-2">
          <UButton
            @click="timerMenuOpen = false"
            variant="link"
            icon="i-heroicons-arrow-left"
          ></UButton>
        </div>
      </TimerMenu>
    </USlideover>
  </div>

  <footer
    class="fixed bottom-0 border-t border-gray-200 dark:border-gray-800 h-12 w-full flex justify-around"
  >
    <UButton
      @click="timerMenuOpen = true"
      icon="i-heroicons-clock"
      variant="ghost"
    ></UButton>
    <UButton
      icon="i-heroicons-arrow-path"
      variant="ghost"
      :loading="loading"
      @click="fetchLiftsFromServerRoute"
    ></UButton>
    <UButton
      @click="addMenuOpen = true"
      icon="i-heroicons-plus-circle"
      variant="ghost"
    ></UButton>
  </footer>
</template>

<script setup lang="ts">
import { registerRuntimeCompiler } from "nuxt/dist/app/compat/capi";
import { Database } from "~~/types/database.types";
import { Lift, CategoryEnums } from "~~/types/lifts";

definePageMeta({
  middleware: "auth",
});

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const toast = useToast();

const categories = Object.keys(CategoryEnums);
const currentCategory = ref("Push");
const tasksFromServer = ref();
const addMenuOpen = ref(false);
const timerMenuOpen = ref(false);
const loading = ref(false);

const newLift = ref({
  name: "",
  category: "Push",
  weight: 0,
  time: 0,
  speed: 0,
  reps: [0, 0, 0, 0, 0],
});

const { data: lifts } = await useAsyncData("lifts", async () => {
  const { data } = await client
    .from("lifts")
    .select("id, name, category, weight, time, speed, reps")
    .eq("user_id", user.value.id)
    .order("created_at");

  return data;
});

const filteredLifts = computed(() => {
  return lifts.value.filter(
    (lift: Lift) => lift.category === currentCategory.value.toLowerCase()
  );
});

async function addLift() {
  addMenuOpen.value = false;

  //Validate input was supplied
  if (
    newLift.value.name.trim().length === 0 ||
    newLift.value.category.trim().length === 0
  ) {
    return;
  }

  loading.value = true;

  const { data } = await client
    .from("lifts")
    .upsert({
      user_id: user.value.id,
      name: newLift.value.name,
      category: newLift.value.category.toLowerCase(),
      weight: newLift.value.weight,
      time: newLift.value.time,
      speed: newLift.value.speed,
      reps: newLift.value.reps,
    })
    .select("id, name, category, weight, time, speed, reps")
    .single();

  lifts.value.push(data);

  currentCategory.value = newLift.value.category;

  newLift.value = {
    name: "",
    category: "Push",
    weight: 0,
    time: 0,
    speed: 0,
    reps: [0, 0, 0, 0, 0],
  };

  loading.value = false;

  toast.add({
    id: "lifts_added",
    title: "Lift Added",
    description: "",
    icon: "i-heroicons-outline-check-circle",
    timeout: 3000,
  });
}

// const completeTask = async (task: Task) => {
//   await client.from('tasks').update({ completed: task.completed }).match({ id: task.id })
// }

const deleteLift = async (liftId: number) => {
  const prompt = confirm("Delete this lift forever?");
  if (!prompt) return;

  await client.from("lifts").delete().match({ id: liftId });

  lifts.value = lifts.value.filter((lift: Lift) => lift.id !== liftId);

  toast.add({
    id: "lifts_deleted",
    title: "Lift Deleted",
    description: "",
    icon: "i-heroicons-outline-check-circle",
    timeout: 3000,
  });
};

const fetchLiftsFromServerRoute = async () => {
  loading.value = true;
  const { data } = await useFetch("/api/lifts", {
    headers: useRequestHeaders(["cookie"]),
    key: "tasks-from-server",
  });

  tasksFromServer.value = data;
  toast.add({
    id: "lifts_updated",
    title: "Lifts Updated!",
    description: "",
    icon: "i-heroicons-outline-check-circle",
    timeout: 3000,
  });
  loading.value = false;
};
</script>

<style scoped></style>
