const DNA ="https://lh3.googleusercontent.com/aida-public/AB6AXuBZF8H6An0IQQB6HoKH25x3iZ3aTUFM5HmEn8ykujbmbNakP1sSmL-dzbv_cH5Uj2r7n_hZPkMjz39odaKYiEydqYqXG-dJmUQ8Jl3Yu5UYFPKQogpFcBCThMFRs5s-zEIgbx8QhgVIJpB0yBeBcnumZah2R_MihZjE9UddDQnGpfQ2bIwdKEaTYZOvNQFKLuc7ked0UkXt1OXrIfJ2w7cdn0fW_xMjjNKuXMfyNj4X7TOAaKm0X2ctLMtm33Ly1aqgN8lOVV6VuFuc?url"
const ArticalRegister = () => {
    return (
            <div className="hidden bg-primary lg:flex w-full medical-gradient flex-col justify-between p-12 relative overflow-hidden">
                <div
                    className="backIMG absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                ></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-16">
               
                        <span className="font-headline-lg text-headline-lg text-4xl text-white">
                            HealthCare Pro
                        </span>

                    </div>
                    <div className="max-w-md">
                        <h1 className="font-headline-xl text-headline-xl text-3xl text-white mb-6">
                            Advancing Clinical Excellence
                        </h1>
                        <p className="font-body-lg text-body-lg text-white/80 text-2xl leading-relaxed">
                            Streamline your workflow with precision tools
                            designed for modern healthcare professionals.
                            Secure, reliable, and intelligent.
                        </p>
                    </div>
                </div>
                <div className="relative z-1 mt-2 flex-grow flex items-center">
                    <div
                        className="asponIMG w-1/2 h-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden relative"              
                    >
                  <img src={DNA} alt="DNA" className="w-full h-full object-cover " />

                    </div>
                </div>
            </div>
    );
};

export default ArticalRegister;
