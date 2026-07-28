import { createTag} from '../actions'

export default function  FormTag(){
  return (
  <form action={createTag}> 
    <input name="name"></input> 
    <input name="color" type="color"></input> 
    <button type="submit">submit</button>
    </form>
  )
}