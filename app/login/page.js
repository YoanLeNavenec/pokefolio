import { login } from "./actions";

export default async function Page({searchParams}) {

  const params= await searchParams;
  {params.error && '1'}

  return (
    <>
    {params.error === '1' && <p>Invalid email or password.</p>}
    <form action={login}>
    <input name="email"></input>
    <input name="password" type="password"></input>
    <button type="submit">submit</button>
    </form>
    </>
  );
}

