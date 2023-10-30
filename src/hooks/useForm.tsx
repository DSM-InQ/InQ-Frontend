import { useState } from "react";

/**
 * 어려개의 input 상태를 관리하는 함수입니다.
 * @param initialState data 값
 */
export function useForm<T>(initialState: T) {
    /** form 저장 state */
    const [form, setForm] = useState<T>(initialState);

    /** 클릭 시 해당 input의 name과 value를 찾아 해당 name의 input의 value 값을 저장하는 함수 */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    return { form, setForm, handleChange };
}
