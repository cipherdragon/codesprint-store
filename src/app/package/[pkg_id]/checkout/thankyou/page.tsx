import styles from "@/styles/Thankyou.module.css"
import { CheckCircle, Home } from "react-feather";

export default function ThankYou() {
    return (
        <div className='proper-padded-container'>
            <div className={`bg-white bg-opacity-10 p-3 box-border border border-white 
                border-opacity-15 rounded-2xl text-white flex flex-col items-center justify-center
                ${styles.thanks}`}>
                <h1 className='sm:text-3xl text-2xl text-center font-bold mb-[20px]'>
                    Thank you for your purchase!
                </h1>
                <p className='text-lg max-w-[600px] mb-[20px] sm:text-justify'>
                    We recorded your purchase. By now, you invoice should have downloaded
                    automatically. Check the invoice for payment bank account and further
                    details.
                </p>
                <p className="text-lg max-w-[600px] sm:text-justify mb-[20px]">
                    After you complete your payment, please submit the deposit slip and 
                    the invoice to&nbsp;
                    <a 
                        className="text-teal-300 cursor-pointer"
                        href="https://codesprint.lk/store-checkout">
                        https://codesprint.lk/store-checkout
                    </a>
                </p>

                <div className="max-w-[600px] w-full flex gap-[10px] 
                    flex-wrap justify-center sm:justify-between">
                    <a href="https://codesprint.lk/store-checkout" className="cursor-pointer">
                        <button 
                            className="font-bold text-white bg-teal-600 p-3 flex gap-[10px]
                                rounded-lg w-[290px] justify-center items-center mb-[10px]
                                border-teal-600 border-2">
                            Submit Payment Receipt!
                            <CheckCircle />
                        </button>
                    </a>
                    <a className="cursor-pointer" href="/">
                        <button 
                            className="font-bold text-teal-400 p-3 flex gap-[10px]
                                rounded-lg w-[290px] justify-center items-center
                                border-2 border-teal-400">
                            Go home!
                            <Home />
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}