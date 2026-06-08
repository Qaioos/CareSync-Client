import type { Task } from "../../Types/api.responses";
import { useAxiosPrivate } from "../../Hook/RequestsWithToken/useAxiosPrivet";
import { useState } from "react";
import type { AxiosError } from "axios";

const useAddTask = () => {
    const  axiosPrivate = useAxiosPrivate();
    const  [isLodaing, setisLodaing] = useState<boolean>(false)
    const [iserr, setIsErr] = useState('')

    const addTask = async (taskData : Task)=>{

        setisLodaing(true);
            try {
                const response  = await axiosPrivate.post('/tasks',{data : taskData})
                return response.data
            } catch (error) {
                const err = error as AxiosError
                console.log('error adding task',err)
                setIsErr(err.message)
            }finally{
                setisLodaing(false)
            }
    }
    return {addTask, isLodaing , iserr};
};

export default useAddTask;
