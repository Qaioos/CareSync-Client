import "../../index.css";
import Form from "./Form";
import { MdLocalHospital } from "react-icons/md";

const FormRegister = () => {
    return (
        <main className=" lg:w-[55%] flex flex-col  w-[100%] items-center  p-10 bg-gray-100">
            <header>
                <p className="my-10"><MdLocalHospital className="text-primary text-6xl"/></p>
                <h1 className="font-bold text-3xl p-1">Join The Team</h1>
                <p className="text-gray-500">
                    Register for seure access to the clinical
                </p>
                <p className="text-gray-500">Managemnt plat form</p>
            </header>
          <Form/>
        </main>
    );
};

export default FormRegister;
