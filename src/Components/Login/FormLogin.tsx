import "../../index.css";

import { MdLocalHospital } from "react-icons/md";
import FormLog from "./FormLog";

const FormLogin = () => {
    return (
        <main className=" lg:w-[55%] flex flex-col  w-[100%] items-center  p-10 bg-gray-100">
            <header>
                <p className="my-10"><MdLocalHospital className="text-primary text-6xl"/></p>
                <h1 className="font-bold text-3xl p-1"> Welcom back </h1>
                <p className="text-gray-500">
                    Please enter your credentials to access
                </p>
                <p className="text-gray-500">your dashboard</p>
            </header>
          <FormLog/>
        </main>
    );
};

export default FormLogin;
