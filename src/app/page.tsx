'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useSelector, useDispatch, Provider } from 'react-redux'
import { RootState } from "@/redux/store";

import useGetData from "@/hooks/getStudentData";

export default function Home() {
  const data = useSelector((state: RootState) => state.data.value)
  // console.log('data: ', data);
  useGetData()
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
