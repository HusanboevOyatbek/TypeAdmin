import ActorTable from "@/components/Table"
import useGet from "@/hook/useGet"

function ActorPage() { 
  const {data} = useGet({url:"actor"})
  return (

    <ActorTable/>
  )
}

export default ActorPage