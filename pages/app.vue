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

    <span v-if="filteredLifts.length === 0" class="block text-center"
      >No workouts for {{ currentCategory }}</span
    >

    <template v-for="lift in filteredLifts">
      <WorkoutCard :lift="lift" @deleteLift="deleteLift(lift.id)" />
    </template>

    <USlideover :modelValue="addMenuOpen">
      <div class="flex justify-start pl-2 pt-2">
        <UButton
          @click="addMenuOpen = false"
          variant="link"
          icon="i-heroicons-arrow-right"
        ></UButton>
      </div>
      <h2 class="px-4 font-bold text-4xl mt-12 mb-6">Add A Lift:</h2>
      <form class="flex flex-col my-2 px-4" @submit.prevent="addLift">
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
          <UButton type="submit" block size="xl" :loading="loading">
            Add
          </UButton>
        </div>
      </form>
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
