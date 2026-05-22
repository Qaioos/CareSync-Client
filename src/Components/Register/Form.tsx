//React icons
import { IoMdCheckmarkCircle } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";
import axios from "../../Config/axios";
import useAuth from "../../Hook/authUser/useAuth";
import type { AuthResponse } from "../../Types/api.responses";
import type { StrapiUser } from "../../Types/api.responses";
import { Link } from "react-router-dom";
import Loading from "../Ui/LodaingSign";

const BAES_URL = "/auth/local/register";

const USER_NAME_RGX = /^[A-Za-z0-9_]{3,20}$/;
const PWS_RGX =
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%])[A-Za-z0-9!@#$%]{8,24}$/;
const EMAIL_RGX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,20}$/;

const Form = () => {
    const { setAuth, signUp } = useAuth();

    const [isLodaing, setisLodaing] = useState(false);

    const nameRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);

    const [username, setUserName] = useState<string>("");
    const [foucsName, setFoucsName] = useState<boolean>(false);

    const [email, setemail] = useState<string>("");

    const [pws, setpws] = useState<string>("");
    const [foucsPws, setFoucsPws] = useState<boolean>(false);

    const [matchPws, setMatchPws] = useState<string>("");

    const [errMsg, setErrMsg] = useState<string>("aasds");
    const [iserr, setIsErr] = useState<boolean>(true);

    const isValidName = USER_NAME_RGX.test(username);
    const isValidPws = PWS_RGX.test(pws);
    const isValidEmail = EMAIL_RGX.test(email);
    const isMatchs = pws === matchPws;

    const isFormValid = isValidName && isValidPws && isValidEmail;

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    useEffect(() => {
        setIsErr(false);
    }, [username, pws, email]);

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setisLodaing(true);

        if (!isFormValid) {
            setErrMsg("Please make sure that all conditions are met first.!! ");
            setIsErr(true);
            return;
        }

        try {
            const response = await axios.post<AuthResponse>(
                BAES_URL,
                JSON.stringify({
                    username: username,
                    email: email,
                    password: pws,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            const accrssToken = response?.data?.jwt;

            const User: StrapiUser = response?.data?.user;

            console.log(response.data);
            console.log(accrssToken);

            setAuth({ User, username, accrssToken });
            signUp(User, accrssToken);
            setemail("");
            setUserName("");
            setpws("");
            setMatchPws("");
        } catch (err) {
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
                User Name:{" "}
                {username ? (
                    isValidName ? (
                        <IoMdCheckmarkCircle className="text-green-600" />
                    ) : (
                        <GiCancel className="text-red-500" />
                    )
                ) : (
                    ""
                )}
            </label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                ref={nameRef}
                onFocus={() => setFoucsName(true)}
                onBlur={() => setFoucsName(false)}
                className=" p-1.5 rounded-xl CustomShadow border border-green-600 outline-none bg-white"
            />
            {foucsName && username && !isValidName && (
                <p className="text-sm bg-black text-white absolute top-20  mt-2 p-1">
                    {" "}
                    ⚠️The name must be at least 4 letters long
                </p>
            )}
            <label
                htmlFor="email"
                className="mb-2 text-gray-700 mt-4 flex items-center"
            >
                Work Email :
                {email ? (
                    isValidEmail ? (
                        <IoMdCheckmarkCircle className="text-green-600" />
                    ) : (
                        <GiCancel className="text-red-500" />
                    )
                ) : (
                    ""
                )}
            </label>
            <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className=" p-1.5 rounded-xl CustomShadow border border-green-600 outline-none bg-white"
            />
            <label
                htmlFor="password"
                className="mb-2 text-gray-700 mt-4 flex items-center"
            >
                PassWord :
                {pws ? (
                    isValidPws ? (
                        <IoMdCheckmarkCircle className="text-green-600" />
                    ) : (
                        <GiCancel className="text-red-500" />
                    )
                ) : (
                    ""
                )}
            </label>
            <input
                type="password"
                value={pws}
                onChange={(e) => setpws(e.target.value)}
                onFocus={() => setFoucsPws(true)}
                onBlur={() => setFoucsPws(false)}
                className=" p-1.5 rounded-xl CustomShadow border border-green-600 outline-none bg-white"
            />
            {foucsPws && pws && !isValidPws && (
                <p className="text-sm absolute bottom-15 h-30 w-70 bg-black text-white  mt-2 p-1">
                    ℹ️ It must be 8 characters or more, containing at least one
                    capital letter, at least one number (0-9), and at least one
                    special character.
                </p>
            )}
            <label
                htmlFor="Confirm"
                className="mb-2 text-gray-700 mt-4 flex items-center"
            >
                Confirme PassWord :
                {matchPws ? (
                    isMatchs ? (
                        <IoMdCheckmarkCircle className="text-green-600" />
                    ) : (
                        <GiCancel className="text-red-500" />
                    )
                ) : (
                    ""
                )}
            </label>
            <input
                type="password"
                value={matchPws}
                onChange={(e) => setMatchPws(e.target.value)}
                className=" p-1.5 rounded-xl CustomShadow border border-green-600 outline-none bg-white"
            />
            <button
                disabled={!isFormValid}
                className="w-ful  transition primary-btn  rounded-lg p-2  cursor-pointer my-5"
            >
                {" "}
                Join Team{" "}
            </button>
            <p>
                Already have an account?{" "}
                <span className="text-secondary cursor-pointer">
                    <Link to={"/login"}>Log in here</Link>
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

export default Form;
