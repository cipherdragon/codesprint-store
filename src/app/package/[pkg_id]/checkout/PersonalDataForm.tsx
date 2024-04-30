import checkoutImg_1 from "@/assets/checkout-img-1.webp";
import Image from "next/image";

interface PersonalDataFormProps {
    fullName: string;
    onFullNameChange: (name: string) => void;

    email: string;
    onEmailChange: (email: string) => void;

    phone: string;
    onPhoneChange: (phone: string) => void;

    address: string;
    onAddressChange: (address: string) => void;
}

export default function PersonalDataForm(props: PersonalDataFormProps) {
    const {
        fullName, onFullNameChange,
        email, onEmailChange,
        phone, onPhoneChange,
        address, onAddressChange
    } = props;

    return (
        <div className="bg-white bg-opacity-10 rounded-xl backdrop-blur-md
            border border-white border-opacity-15 mb-[20px] overflow-hidden
            lg:flex lg:gap-[20px]">
            <Image 
                src={checkoutImg_1}
                alt="checkout image"
                className="max-w-[450px] object-cover object-center max-lg:hidden" />
            <form className="p-3 min-w-[400px]">
                <h2 className="text-2xl font-bold mb-[30px]">
                    Who are you btw?
                </h2>

                <div className="flex flex-wrap gap-[20px]">
                    <div className="w-full">
                        <label htmlFor="full_name" className="block text-sm font-bold text-white mb-[5px]">
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            id="full_name" 
                            name="full_name" 
                            className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={e => onFullNameChange(e.target.value)} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-sm font-bold text-white mb-[5px]">
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20"
                            placeholder="mail@example.com"
                            value={email}
                            onChange={e => onEmailChange(e.target.value) } />
                    </div>
                    <div className="w-full">
                        <label htmlFor="phone" className="block text-sm font-bold text-white mb-[5px]">
                            Phone
                        </label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20"
                            placeholder="0712345678"
                            value={phone}
                            onChange={e => onPhoneChange(e.target.value) } />
                    </div>
                    <div className="w-full">
                        <label htmlFor="address" className="block text-sm font-bold text-white mb-[5px]">
                            Address
                        </label>
                        <textarea 
                            id="address" 
                            name="address" 
                            className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20"
                            placeholder="123, Example Street, Colombo 05"
                            value={address}
                            onChange={e => onAddressChange(e.target.value) } />
                    </div>
                </div>
            </form>
        </div>
    );
}