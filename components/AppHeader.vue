<script setup lang="ts">
const client = useSupabaseAuthClient();
const user = useSupabaseUser();
const colorMode = useColorMode();

const toggleDark = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const colorModeIcon = computed(() =>
  colorMode.preference === "dark"
    ? "i-heroicons-outline-moon"
    : "i-heroicons-outline-sun"
);

const logout = async () => {
  await client.auth.signOut();
  navigateTo("/");
};
</script>

<template>
  <nav
    class="flex justify-between px-2 items-center fixed top-0 w-full bg-white dark:bg-gray-900 z-50"
  >
    <Title>Lofi Lift</Title>
    <a href="/">
      <span class="font-bold">Lofi Lift</span>
    </a>
    <UButton
      variant="ghost"
      color="white"
      :icon="colorModeIcon"
      @click="toggleDark"
    />
    <UButton
      v-if="user"
      variant="ghost"
      color="white"
      @click="logout"
      :padded="false"
    >
      Logout
    </UButton>
  </nav>
</template>
