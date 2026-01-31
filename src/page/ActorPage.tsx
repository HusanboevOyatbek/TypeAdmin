import ActorAddForm from "@/components/ActorAddForm";
import AddModal from "@/components/Modal";
import ActorTable from "@/components/Table"
import useGet from "@/hook/useGet"
import type { ActorDataType } from "@/types/ctorTpes";
import { useState } from "react";

const  ActorPage = () => { 

      const [open, setOpen] = useState(false);
  

  const { data } = useGet<ActorDataType[]>({ url: "actor", key: ["actors"]})
 console.log(data);
 
  
  return (

    <div>

      <AddModal open={open} setOpen={setOpen} text={"Aktor"}>
        <ActorAddForm  setOpen={setOpen} />          
      </AddModal>

      <ActorTable data={data} />
    </div>
  )
}

export default ActorPage