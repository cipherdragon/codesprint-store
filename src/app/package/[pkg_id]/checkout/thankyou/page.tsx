import styles from "@/styles/Thankyou.module.css"

export default function ThankYou() {
    return (
        <div className='proper-padded-container'>
            <div className={`bg-white bg-opacity-10 p-3 box-border border border-white 
                border-opacity-15 rounded-2xl text-white flex flex-col items-center justify-center
                ${styles.thanks}`}>
                <h1 className='text-3xl font-bold mb-[20px]'>Thank you for your purchase!</h1>
                <p className='text-lg max-w-[700px] mb-[20px] text-justify'>
                    We recorded your purchase. By now, you invoice should have downloaded
                    automatically. Check the invoice for payment bank account and further
                    details.
                </p>
                <p className="text-lg max-w-[700px] text-justify mb-[20px]">
                    After you complete your payment, please submit the deposit slip and 
                    the invoice to&nbsp;
                    <a 
                        className="text-teal-300 cursor-pointer"
                        href="https://codesprint.lk/store-checkout">
                        https://codesprint.lk/store-checkout
                    </a>
                </p>
                <p className="text-lg max-w-[700px] text-justify">
                    <a 
                        className="text-teal-300 cursor-pointer"
                        href="/">
                        Go home!
                    </a>
                </p>
            </div>
        </div>
    );
}