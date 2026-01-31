import AddModal from "@/components/Modal";
import CategoryTable from "@/components/CategoryTable"
import useGet from "@/hook/useGet"
import type { CategoryType } from "@/types/CategoryType";
import { useState } from "react";
import CategoryAddForm from "@/components/CategoryAddForm";

const CategoryPage = () => {
  const [open, setOpen] = useState(false);

  const { data, error, isLoading } = useGet<CategoryType[]>({ url: "category", key: ["categories"] })
  console.log('CategoryPage - data:', data, 'error:', error, 'isLoading:', isLoading);

  return (
    <div>
      <AddModal open={open} setOpen={setOpen} text={"Toifa"}>
        <CategoryAddForm setOpen={setOpen} />
      </AddModal>

      <CategoryTable data={data} />
    </div>
  )
}

export default CategoryPage