import checkoutImg_1 from "@/assets/checkout-img-1.webp";
import { isEmailValid, isNameValid, isPhoneValid } from "@/util/Validator";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PersonalDataFormProps {
    fullName: string;
    onFullNameChange: (name: string) => void;

    email: string;
    onEmailChange: (email: string) => void;

    phone: string;
    onPhoneChange: (phone: string) => void;

    address: string;
    onAddressChange: (address: string) => void;

    onEmptinessChange: (isAllFilled: boolean) => void;
    showEmptiness: boolean;
}

export default function PersonalDataForm(props: PersonalDataFormProps) {
    const {
        fullName, onFullNameChange,
        email, onEmailChange,
        phone, onPhoneChange,
        address, onAddressChange,
        onEmptinessChange, 
        showEmptiness
    } = props;

    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLTextAreaElement>(null);
    
    const [isFormFilled, setIsFormFilled] = useState(false);

    useEffect(() => {
        const formFilled = fullName && email && address && phone;

        if (formFilled && !isFormFilled) {
            setIsFormFilled(true);
            onEmptinessChange(true);
        } else if (!formFilled && isFormFilled) {
            setIsFormFilled(false)
            onEmptinessChange(false);
        }
    }, [fullName, email, address, phone])

    const setName = (name: string) => {
        name = name
                .trimStart()
                .replace(/\s+/g, " ")
                .replace(/[^a-zA-Z\s]/g, "")
        
        onFullNameChange(name);
    };

    const setPhone = (phone: string) => {
        phone = phone
                .trim()
                .replace(/\s+/g, "")
                .replace(/[^0-9]/g, "")
        
        onPhoneChange(phone);
    }

    useEffect(() => {
        const debouncedCheck = setTimeout(() => {
            if ((email || showEmptiness) && !isEmailValid(email)) {
                emailRef.current?.classList.add("input-box--error");
            } else {
                emailRef.current?.classList.remove("input-box--error");
            }

            if ((phone || showEmptiness) && !isPhoneValid(phone)) {
                phoneRef.current?.classList.add("input-box--error");
            } else {
                phoneRef.current?.classList.remove("input-box--error");
            }

            if ((fullName || showEmptiness) && !isNameValid(fullName)) {
                nameRef.current?.classList.add("input-box--error");
            } else {
                nameRef.current?.classList.remove("input-box--error");
            }

            if (!address && showEmptiness) {
                addressRef.current?.classList.add("input-box--error");
            } else {
                addressRef.current?.classList.remove("input-box--error");
            }
        }, 800)

        return () => clearTimeout(debouncedCheck);
    }, [email, phone, fullName, address, showEmptiness])

    return (
        <div className="bg-white bg-opacity-10 rounded-xl backdrop-blur-md
            border border-white border-opacity-15 mb-[20px] overflow-hidden
            lg:flex lg:gap-[20px]">
            <Image 
                src={checkoutImg_1}
                alt="checkout image"
                className="max-w-[450px] object-cover object-center max-lg:hidden" />

            <form className="p-3 lg:min-w-[400px]">
                <h2 className="text-2xl font-bold mb-[30px] text-white">
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
                            className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white"
                            placeholder="John Doe"
                            value={fullName}
                            ref={nameRef}
                            onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-sm font-bold text-white mb-[5px]">
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white"
                            placeholder="mail@example.com"
                            value={email}
                            ref={emailRef}
                            onChange={e => onEmailChange(e.target.value.trim()) } />
                    </div>
                    <div className="w-full">
                        <label htmlFor="phone" className="block text-sm font-bold text-white mb-[5px]">
                            Phone
                        </label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white"
                            placeholder="0712345678"
                            value={phone}
                            ref={phoneRef}
                            onChange={e => setPhone(e.target.value) } />
                    </div>
                    <div className="w-full">
                        <label htmlFor="address" className="block text-sm font-bold text-white mb-[5px]">
                            Address
                        </label>
                        <textarea 
                            id="address" 
                            name="address" 
                            className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white"
                            placeholder="123, Example Street, Colombo 05"
                            value={address}
                            ref={addressRef}
                            onChange={e => onAddressChange(e.target.value.trimStart()) } />
                    </div>
                </div>
                <p className="mt-[10px]">
                    Note: Delivery will be offered for customers out of Colombo.
                    Please note that an extra delivery fee will be charged.
                </p>
            </form>
        </div>
    );
}