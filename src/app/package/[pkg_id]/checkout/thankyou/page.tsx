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
                <p className='text-lg max-w-[600px] mb-[20px] sm:text-justify line-through text-neutral-500'>
                    We recorded your purchase. By now, your invoice should have been
                    downloaded automatically. Check the invoice for payment bank 
                    account and further details.
                </p>
                <p className="text-lg max-w-[600px] sm:text-justify mb-[20px] line-through text-neutral-500">
                    After you complete your payment, please submit the deposit slip and 
                    the invoice to https://codesprint.lk/store-checkout
                </p>
                <p className='text-lg max-w-[600px] mb-[20px] sm:text-justify'>
                    Codesprint merch store is officially closed now. We are no longer
                    accepting orders or payments. Site's functionality is preserved
                    only for archival purposes. 
                </p>
                <p className='text-lg max-w-[600px] mb-[20px] sm:text-justify'>
                    Thank you for your support!
                </p>

                <div className="max-w-[600px] w-full flex gap-[10px] 
                    flex-wrap justify-center sm:justify-between">
                    <button 
                        className="font-bold text-white bg-teal-600 p-3 flex gap-[10px]
                            rounded-lg w-[290px] justify-center items-center mb-[10px]
                            border-teal-600 border-2">
                        Submit Payment Receipt!
                        <CheckCircle />
                    </button>
                    <a className="cursor-pointer" href="/">
                        <button 
                            className="font-bold text-teal-400 p-3 flex gap-[10px]
                                rounded-lg w-[290px] justify-center items-center
                                border-2 border-teal-400">
                            Go Back to Home Page!
                            <Home />
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}