//React icons
import { GiCancel } from "react-icons/gi";
import React, { useState, useEffect, useRef } from "react";
import axios from "../../Config/axios";
import useAuth from "../../Hook/authUser/useAuth";
import type { AuthResponse } from "../../Types/api.responses";
import type { StrapiUser } from "../../Types/api.responses";
import { ImSpinner2 } from "react-icons/im";
import Loading from "../Ui/LodaingSign";
import { Link, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
const BAES_URL = "/auth/local";

const FormLog = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();


    const nameRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [isLodaing, setisLodaing] = useState<boolean>(false);

    const [username, setUserName] = useState<string>("");
    const [pws, setpws] = useState<string>("");

    const [errMsg, setErrMsg] = useState<string>("aasds");
    const [iserr, setIsErr] = useState<boolean>(true);

    useEffect(() => {
        nameRef.current?.focus();
    }, []);

    useEffect(() => {
        setIsErr(false);
    }, [username, pws]);

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setisLodaing(true);

        try {
            const response = await axios.post<AuthResponse>(
                BAES_URL,
                JSON.stringify({
                    identifier: username,
                    password: pws,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            const accrssToken = response?.data?.jwt;

            const user: StrapiUser = response?.data?.user;

            const userResponse = await axios.get("/users/me?populate=role", {
                headers: {
                    Authorization: `Bearer ${accrssToken}`,
                },
            });


            const rols: string = userResponse?.data?.role?.name;

            setAuth({ user, username, rols, accrssToken });
            setUserName("");
            setpws("");


            if (rols === "Admin") {
                navigate("/admin", { replace: true });
            } else if (rols === "Authenticated") {
                navigate("/nuse", { replace: true });
            } else {
                navigate("/", { replace: true }); 
            }

        } catch (error ) {
            const err = error as AxiosError
            setIsErr(true);
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
        } finally {
            setisLodaing(false);
        }
    };

    return (
        <form
            onSubmit={handelSubmit}
            className="flex flex-col  relative my-4 w-70 "
        >
            {iserr && (
                <p
                    ref={errRef}
                    className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 my-3 text-sm font-medium flex items-center gap-2"
                >
                    <GiCancel className="text-red-500" />
                    <span>{errMsg}</span>
                </p>
            )}
            <label
                htmlFor="name"
                className="mb-2 text-gray-700 mt-4 flex items-center"
            >
                UserName Or Email
            </label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                ref={nameRef}
                className=" p-1.5 rounded-xl CustomShadow border border-green-600 outline-none bg-white"
            />
            <label
                htmlFor="password"
                className="mb-2 text-gray-700 mt-4 flex items-center"
            >
                PassWord:
            </label>
            <input
                type="password"
                value={pws}
                onChange={(e) => setpws(e.target.value)}
                className=" p-1.5 rounded-xl CustomShadow border border-green-600 outline-none bg-white"
            />
            <div className="flex  justify-end  items-center flex-row-reverse">

            </div>

            <button className="w-ful  transition primary-btn  rounded-lg p-2  cursor-pointer my-5">
                {" "}
                {!isLodaing ? (
                    <p> Log in </p>
                ) : (
                    <p>
                        <ImSpinner2 />
                    </p>
                )}
            </button>
            <div className="card-shadow p-2 text-primary">
                <p>Admin </p>
                <p>Email : admin@demo.com</p>
                Paswrrd : Password123
            </div>
            <p>
                Don't have an account?{" "}
                <span className="text-secondary cursor-pointer">
                    <Link to={"/sign-up"}> Sign Up </Link>
                </span>
            </p>
            {isLodaing ? (
                <Loading fullPage={true} message="Waiting for Loading..." />
            ) : (
                ""
            )}
        </form>
    );
};

export default FormLog;
