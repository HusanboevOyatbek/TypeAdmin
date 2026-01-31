import AddModal from "@/components/Modal";
import useGet from "@/hook/useGet"
import type { GenreType } from "@/types/GenreType";
import { useState } from "react";
import GenreAddForm from "@/components/GenreAddForm";
import GenreTable from "@/components/GenreTable";

const GanerPage = () => {
  const [open, setOpen] = useState(false);

  const { data} = useGet<GenreType[]>({ url: "genre", key: ["genres"] })
console.log(data);

  return (
    <div>
      <AddModal open={open} setOpen={setOpen} text={"Janr"}>
        <GenreAddForm setOpen={setOpen} />
      </AddModal>

      <GenreTable data={data} />
    </div>
  )
}

export default GanerPage