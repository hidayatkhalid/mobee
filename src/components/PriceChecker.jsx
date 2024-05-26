import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/helper/supabaseClient";

const PriceChecker = () => {
    const [datas, setDatas] = useState([]);
    const [years, setYears] = useState([]);
    const [models, setModels] = useState([]);
    const [variants, setVariants] = useState([]);
    const [prices, setPrices] = useState([]);

    const [selectedMake, setSelectedMake] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedVariant, setSelectedVariant] = useState("");

    const [loading, setLoading] = useState(false);

    //MAKE
    async function getData() {
        try {
            setLoading(true);
            let { data: priceChecker, error } = await supabase
                .from('priceChecker')
                .select('*')

            if (error) {
                throw error;
            }
            if (priceChecker != null) {
                setDatas(priceChecker);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const uniqueMakes = [...new Set(datas.map(data => data.make))];

    const makeHandler = (e) => {
        const makeSelected = e.target.value;
        setSelectedMake(makeSelected);
        setSelectedYear("");
        setSelectedModel("");
        setSelectedVariant("");
        setYears([...new Set(datas.filter(data => data.make === makeSelected).map(data => data.year))]);
        setModels([]);
        setVariants([]);
        setPrices([]);
    }

    const yearHandler = (e) => {
        const yearSelected = e.target.value;
        setSelectedYear(yearSelected);
        setSelectedModel("");
        setSelectedVariant("");
        setModels([...new Set(datas.filter(data => data.make === selectedMake && data.year === yearSelected).map(data => data.model))]);
        setVariants([]);
        setPrices([]);
    }

    const modelHandler = (e) => {
        const modelSelected = e.target.value;
        setSelectedModel(modelSelected);
        setSelectedVariant("");
        setVariants([...new Set(datas.filter(data => data.make === selectedMake && data.year === selectedYear && data.model === modelSelected).map(data => data.variant))]);
        setPrices([]);
    }

    const variantHandler = (e) => {
        const variantSelected = e.target.value;
        setSelectedVariant(variantSelected);
        setPrices(datas.filter(data => data.make === selectedMake && data.year === selectedYear && data.model === selectedModel && data.variant === variantSelected).map(data => data.price));
    }

    const resetButton = () => {
        setSelectedMake("");
        setSelectedYear("");
        setSelectedModel("");
        setSelectedVariant("");
        setModels([]);
        setVariants([]);
        setPrices([]);
    }

    return (
        <>
            <section className="flex lg:flex-row h-[75vh]  bg-[#FEEDEB] flex-col">

                <div className="flex flex-col lg:basis-1/2 justify-center lg:pl-[100px] sm:px-10 md:px-10 pt-10 py-2 pl-10">
                    <div className="flex flex-col items-start pb-5">
                        <h1 className="lg:text-[30px] text-3xl  font-extrabold">Get Instant Quote.</h1>
                        <h2 className="lg:text-[20px] text-lg text-start font-light">Check the value for your used car<br />instantly and get the highest offers from our authorised buyers.</h2>
                    </div>

                    <div className="lg:flex lg:gap-5 py-5 lg:justify-between lg:mr-14 hidden lg:flex-row">
                        <div className="flex items-center">
                            <span className="animated p-2">
                                <i class="fa-solid fa-calculator fa-3x"></i>
                            </span>

                            <div className="flex flex-col pl-2 items-start">
                                <h4 className="font-bold text-base">Honest</h4>
                                <p className=" font-light text-sm">Quotes</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <span className="animated p-2">
                                <i class="fa-solid fa-dollar-sign fa-3x"></i>
                            </span>

                            <div className="flex flex-col pl-2 items-start">
                                <p className="font-bold text-base">No</p>
                                <p className="font-thin text-sm">Hidden Fees</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <span className="animated p-2">
                                <i class="fa-sharp fa-solid fa-bolt fa-3x "></i>
                            </span>

                            <div className="flex flex-col pl-2 items-start">
                                <p className="font-bold text-base">Fast</p>
                                <p className="font-thin text-sm">Transaction</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex py-1 lg:py-5">
                        <p className="font-thin text-xs">Mobee proprietory used car database.</p>
                    </div>
                </div>


                <div className="lg:basis-1/2 flex items-center lg:px-10 px-5 justify-center">
                    <div className="flex flex-col p-5 lg:gap-2 bg-white rounded-2xl shadow-2xl w-[90vw] md:w-full sm:w-full">

                        <div className="flex justify-end lg:px-5">
                            <button className=" bg-red-400 px-3 py-2 rounded-2xl hover:shadow-lg hover:bg-red-500 lg:flex items-center" onClick={resetButton}>
                                <i class="fa-solid fa-arrow-rotate-right fa-lg" style={{ color: "white" }}></i>
                                <span className="mx-2 text-white font-bold hidden lg:block">Reset</span>
                            </button>
                        </div>

                        <div className="">
                            <form className="flex flex-col lg:flex-row" id="form">

                                <div className="basis-1/2 flex flex-col pb-3 lg:p-5">

                                    <div className="flex flex-col mb-2">
                                        <p className="flex pl-1 font-bold">Make</p>
                                        <select className=" bg-neutral-200 p-2 rounded-xl" onChange={makeHandler} value={uniqueMakes.make}>
                                            {/* <option value=''>Select value first</option> */}
                                            {
                                                uniqueMakes.map((make, index) => (
                                                    <option key={index} value={make}>
                                                        {make}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="flex flex-col ">
                                        <p className="flex pl-1 font-bold">Year</p>
                                        <select className=" bg-neutral-200 p-2 rounded-xl disabled:bg-neutral-100" onChange={yearHandler} value={selectedYear} disabled={!selectedMake}>
                                            <option value="">--select year--</option>
                                            {
                                                years.sort((a, b) => a - b).map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))
                                            }

                                        </select>
                                    </div>


                                </div>

                                <div className="basis-1/2 flex flex-col lg:p-5">

                                    <div className="flex flex-col mb-2">
                                        <p className="flex pl-1 font-bold">Model</p>
                                        <select className=" bg-neutral-200 p-2 rounded-xl disabled:bg-neutral-100" onChange={modelHandler} value={selectedModel} disabled={!selectedYear}>
                                            <option>--select model--</option>
                                            {
                                                models.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))
                                            }

                                        </select>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="flex pl-1 font-bold">Variant</p>
                                        <select className=" bg-neutral-200 p-2 rounded-xl disabled:bg-neutral-100" onChange={variantHandler} value={selectedVariant} disabled={!selectedModel}>
                                            <option value="">--select variant--</option>
                                            {
                                                variants.map((item, index) => (
                                                    <option value={item} key={index}>{item}</option>
                                                ))
                                            }
                                        </select>
                                    </div>


                                </div>



                            </form>
                        </div>
                        <div className="flex flex-row lg:justify-center items-center justify-end">

                            <p className="px-4">Price:</p>
                            <div className="lg:p-5 flex py-5">
                                <div className="basis-1/5 bg-green-400 p-2 rounded-l-2xl">
                                    <p className=" text-gray-500">RM</p>
                                </div>
                                <div className="basis-4/5 bg-green-400 p-2 rounded-r-2xl lg:w-[200px] w-[100px]">

                                    <p className="font-bold text-end pr-2">{prices < 1 ? "0" : prices.toString()}</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </>
    );
}

export default PriceChecker
