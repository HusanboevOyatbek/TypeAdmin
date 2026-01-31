import AddModal from "@/components/Modal";
import MovieAddForm from "@/components/MovieAddForm";
import MovieTable from "@/components/MovieTable"
import useGet from "@/hook/useGet"
import type { MovieType } from "@/types/MovieType";
import { useState } from "react";

const MoviePage = () => {
  const [open, setOpen] = useState(false);

  const { data } = useGet<MovieType[]>({ url: "movie", key: ["movies"] })
console.log(data);

  return (
    <div>
      <AddModal open={open} setOpen={setOpen} text={"Kino"}>
        <MovieAddForm setOpen={setOpen} />
      </AddModal>

      <MovieTable data={data} />
    </div>
  )
}

export default MoviePage