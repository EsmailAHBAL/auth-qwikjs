import { $, component$, createSignal, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, Form, useNavigate } from "@builder.io/qwik-city";


export default component$(() => {
  const nav = useNavigate()
  const message = useSignal("")
  const user = useStore({
    username: ""
    , password: ""
  })
  useVisibleTask$(() => {

  })
  const login = $(async () => {

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => {
      if (res.ok) {
        message.value = "yeah"
        return res.json()
      }
      return res.json().then(myer => {
        message.value = myer.error

      })

    })
      .then(data => {
        localStorage.user_token = data.token_user
      })

  })
  return <>
    <section class="max-w-5xl mx-auto pt-10">
      <div class={message.value.length ? 'bg-black p-3 text-white' : 'hidden'}>

        {message.value}
      </div>
      <div class="text-center text-3xl py-10 font-bold">
        By NestJs and QwikJs
      </div>

      <Form class="p-3  flex flex-col gap-3 mx-auto w-1/2">
        <input class="border-4 border-gray-700" value="" onInput$={(e) => (user.username = (e.target as HTMLInputElement).value)} />
        <input class="border-4 border-gray-700" value="" onInput$={(e) => (user.password = (e.target as HTMLInputElement).value)} />
        <div class="text-center">
          <button onClick$={login}
            class="bg-black px-20 text-white italic rounded-lg py-2"
          >Login</button>
        </div>
      </Form>
    </section>
  </>;
});
