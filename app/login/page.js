import { login } from "./actions";

export default function Page() {
  return (
    <>
    <form action={login}>
    <input name="email"></input>
    <input name="password" type="password"></input>
    <button type="submit">submit</button>
    </form>
    </>
  );
}