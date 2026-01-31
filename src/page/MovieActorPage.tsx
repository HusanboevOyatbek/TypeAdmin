import AddModal from "@/components/Modal";
import MovieActorTable from "@/components/MovieActorTable";
import MovyActorAddForm from "@/components/MovyActorAddForm";
import useGet from "@/hook/useGet"
import type { MovieActorTyps } from "@/types/MovieActorTyps";
import { useState } from "react";

const MovieActorPage = () => {

    const [open, setOpen] = useState(false);


    const { data } = useGet<MovieActorTyps[]>({ url: "movie_actor", key: ["movie_actors"] })
    console.log(data);
    
    ;


    return (

        <div>

            <AddModal open={open} setOpen={setOpen} text={"Actor"}>
                <MovyActorAddForm setOpen={setOpen} />
            </AddModal>

            <MovieActorTable data={data} />
        </div>
    )
}

export default MovieActorPage;