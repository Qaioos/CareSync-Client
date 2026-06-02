import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import  {axiosInstance}  from  '../../Config/axios' // تأكد من المسار الصحيح
import useAuth from "../authUser/useAuth";

export const useAxiosPrivate = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        //  (Request Interceptor)
        const requestIntercept = axiosInstance.interceptors.request.use(
            (config) => {
                const token = auth?.accrssToken; 
                if (token && config.headers) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        //  (Response Interceptor)
        const responseIntercept = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error?.response && error?.response.status === 403) {
                    console.log('Navigating the user to login');
                    navigate('/login', { state: { from: location }, replace: true });
                }
                return Promise.reject(error);
            }
        );

        //  (Cleanup)
        return () => {
            axiosInstance.interceptors.request.eject(requestIntercept);
            axiosInstance.interceptors.response.eject(responseIntercept);
        };
    }, [auth, navigate, location]);

    return axiosInstance;
};
