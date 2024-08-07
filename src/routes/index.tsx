import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { useSession, useSignOut } from "./plugin@auth";
export const onRequest: RequestHandler = ({ cookie, redirect }) => {
  const session = cookie.get('authjs.session-token')
  if (!session?.value) {
    throw redirect(301, "/auth/signin")
  }
};
export default component$(() => {
  const session = useSession()
  const sout = useSignOut()
  return (
    <div class="max-w-7xl mx-auto pt-50 select-none">
      <div class="flex justify-center py-3">
        <p class="text-gray-600 font-bold">Dashboard</p>
      </div>
      <section class="bg-black text-white h-screen rounded-lg text-center ">

        <h1 class="text-4xl italic font-bold py-3  bg-amber-200 text-black">
          {session.value?.user?.name}
        </h1>
        <div class="p-10">
          <button class="bg-white text-black px-10 py-2" onClick$={() => sout.submit({ redirectTo: "/auth/signin" })}> LougOUt</button>
        </div>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "authentification",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
