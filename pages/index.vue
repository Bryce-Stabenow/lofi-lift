<template>
  <main class="flex flex-col">
    <section>
      <div
        class="min-h-full flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8"
      >
        <h2 class="mt-20 text-center font-extrabold text-8xl">
          Lofi Lift <br />
        </h2>

        <span class="text-center text-3xl font-extrabold text-primary-500">
          Focus on your progress, not your phone
        </span>

        <h1 class="mt-20 mb-6 text-xl">The Minimalist Workout App</h1>

        <div class="w-[200px] flex justify-center gap-4">
          <NuxtLink
            to="/login"
            class="flex-1 text-center py-2 bg-primary-500 rounded-full w-fit"
            >Login</NuxtLink
          >

          <NuxtLink
            to="/login"
            class="flex-1 text-center py-2 border border-primary-500 text-primary-500 rounded-full w-fit"
            >Sign Up</NuxtLink
          >
        </div>
      </div>
    </section>

    <section
      class="p-12 pb-0 mt-20 border border-gray-200 dark:border-gray-600 rounded-lg"
    >
      <h2 class="text-3xl font-extrabold">
        Easy Workout Tracker
        <span class="font-normal text-lg">(with no distratcions)</span>
      </h2>
      <p class="mt-2">
        No fuss, not conflicts, just you and your goals. Get to the one thing
        that matters.
      </p>
      <p>
        We keep track of your current weight, reps, and exercise so you can
        focus on improving yourself every day.
      </p>
      <NuxtImg
        src="/workouts.png"
        class="w-3/4 mx-auto h-[370px] object-cover object-top mt-6 rounded-t-xl"
      ></NuxtImg>
    </section>

    <section
      class="p-12 pb-0 mt-20 border border-gray-200 dark:border-gray-600 rounded-lg"
    >
      <h2 class="text-3xl font-extrabold">Set Counter and Workout Timer</h2>
      <p class="mt-2">
        Keep track of your sets and the time for rests with a built-in timer.
        Check the box to let us start your rest timer after your set
      </p>
      <NuxtImg
        src="/tracker.png"
        class="w-3/4 mx-auto h-[350px] object-cover object-top mt-6 rounded-t-xl"
      ></NuxtImg>
    </section>

    <section
      class="p-12 pb-0 mt-20 border border-gray-200 dark:border-gray-600 rounded-lg"
    >
      <h2 class="text-3xl font-extrabold">Track Workouts by Category</h2>
      <p class="mt-2">
        Keep things basic. Add lifts where they count to target specific areas.
      </p>
      <NuxtImg
        src="/categories.png"
        class="w-3/4 mx-auto h-[250px] object-cover object-top mt-6 rounded-t-xl"
      ></NuxtImg>
    </section>

    <section
      class="p-12 pb-0 my-20 border border-gray-200 dark:border-gray-600 rounded-lg"
    >
      <h2 class="text-3xl font-extrabold">Dark Mode and Light Mode</h2>
      <p class="mt-2">
        We don't judge. What works best for you will work here.
      </p>

      <div class="flex flex-row gap-4">
        <NuxtImg
          src="/light-mode.png"
          class="w-1/2 mx-auto h-[250px] object-cover object-top mt-6 rounded-t-xl"
        ></NuxtImg>

        <NuxtImg
          src="/dark-mode.png"
          class="w-1/2 mx-auto h-[250px] object-cover object-top mt-6 rounded-t-xl"
        ></NuxtImg>
      </div>
    </section>
  </main>
</template>
