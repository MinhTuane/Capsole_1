import { cn } from '@/lib/utils';
import Image from 'next/image'

interface Props {
    className : string;
    img:string;
    title:string;
    description : string;
    handleClick:() =>void;
}
const HomeCard = ({className,img, title ,description, handleClick}:Props) => {
    
    return (
        <div className={cn( 'px-12 py-10 flex flex-col justify-between w-full xl:max-w-[480px] min-h-[290px] rounded-[14px] cursor-pointer', className)}
            onClick={handleClick}
        >
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image src={img} width={27} height={27} alt='Meeting' />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className='text-2xl font-bold'>{title}</h1>
                <p className='text-lg font-normal'>{description}</p>
            </div>
        </div>
    )
}

export default HomeCard