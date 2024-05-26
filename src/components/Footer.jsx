import logo from '../logo.svg'

const Footer = () => {
    return (
        <section className=" bg-gray-900 h-[25vh] flex">
            <div className='flex flex-col lg:basis-1/2 pt-5 flex-grow'>
                <h1 className=' text-[#FEEDEB] font-extrabold text-[30px]'>Stack used:</h1>
                <div className='grid grid-cols-3 justify-items-center items-center gap-x-2'>
                    <img src={logo} className='size-[100px]' alt='react logo' />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png?20230715030042" alt='tailwind logo' className='w-[70px]' />
                    <img src="https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" alt="supabase logo" width={50} />
                    <p className='text-[#FEEDEB] font-bold'>ReactJS</p>
                    <p className='text-[#FEEDEB] font-bold'>TailwindCSS</p>
                    <p className='text-[#FEEDEB] font-bold'>Supabase</p>
                </div>

            </div>
            <div className='lg:basis-1/2 lg:flex flex-col justify-center gap-5 hidden'>
                <p className='text-[#FEEDEB] text-lg'>This website is fully responsive and features animated icons.</p>
                <p className='text-[#FEEDEB] '>Made by: <span className='font-bold'>Hidayat</span></p>
            </div>
        </section>
    )
}

export default Footer
