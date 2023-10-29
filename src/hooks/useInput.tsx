import { ChangeEvent, useState } from 'react';

/**
 * 하나의 input 상태를 관리하는 함수입니다.
 * @param initialState data 값
*/
export function useInput<T>(initialState: T) {
	/** data 저장 state */
	const [form, setForm] = useState<T>(initialState);

	/** 클릭 시 값을 저장하는 함수 */
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm(e.target.value as unknown as T);
	};

	return { form, setForm, handleChange };
}
