<template>
  <div class="w-full mt-24">
    <nav class="flex items-center mb-6">
      <ul
        class="flex w-full justify-between dark:border-gray-700 border-b mb-2"
      >
        <template v-for="cat in categories">
          <li
            class="font-bold text-primary-400 text-lg text-center flex-1 rounded-t-md dark:border-gray-700"
            :class="[currentCategory === cat ? 'border border-b-0' : '']"
          >
            {{ cat }}
          </li>
        </template>
      </ul>
    </nav>

    <section
      v-for="lift in lifts"
      class="my-6 border rounded-md dark:border-gray-700"
    >
      <div
        class="flex justify-between items-center border-b dark:border-gray-700 px-4 py-2"
      >
        <h3 class="font-bold text-xl flex-1 truncate">{{ lift.name }}</h3>
        <p class="capitalize text-gray-400 dark:text-gray-700">
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
        <li>
          <span class="text-primary-400">Intensity: </span>{{ lift.speed }}
        </li>
        <li><span class="text-primary-400">Minutes: </span>{{ lift.time }}</li>
      </ul>
      <div class="flex justify-end">
        <UButton
          size="sm"
          variant="ghost"
          color="red"
          icon="i-heroicons-outline-trash"
          @click="deleteLift(lift.id)"
        />
      </div>
    </section>

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
    class="fixed bottom-0 border-t border-gray-200 dark:border-gray-700 h-12 w-full flex justify-around"
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
