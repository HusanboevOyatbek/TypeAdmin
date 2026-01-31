import DirectorAddForm from "@/components/DirectorAddForm";
import DirectorTable from "@/components/DirectorTable";
import AddModal from "@/components/Modal";
import useGet from "@/hook/useGet"
import type { DirectorType } from "@/types/DirectorType";
import { useState } from "react";

const DerectorPage = () => {
  const [open, setOpen] = useState(false);

  const { data} = useGet<DirectorType[]>({ url: "director", key: ["directors"] })
console.log(data);

  return (
    <div>
      <AddModal open={open} setOpen={setOpen} text={"Rejissyor"}>
        <DirectorAddForm setOpen={setOpen} />
      </AddModal>

      <DirectorTable data={data} />
    </div>
  )
}

export default DerectorPage