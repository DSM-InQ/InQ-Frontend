// import React, { InputHTMLAttributes } from "react";
// import Image from 'next/image';
// import styled, { css, CSSProperties } from 'styled-components';
// import { color } from '@/styles/theme';

// interface inputPropsType extends InputHTMLAttributes<HTMLInputElement> {
//     width?: string;
//     placeholder?: string;
//     disabled?: boolean;
//     icon?: string;
//     iconClick?: () => void;
//     label?: string;
//     margin?: CSSProperties['margin'];
//     isError?: boolean;
//     name?: string;
//     value?: string | number;
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
//     onForm?: () => void;
// }

// interface checkBoxPropsType {
//     disabled?: boolean;
//     text?: string;
//     margin?: CSSProperties['margin'];
//     checked: boolean;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// /**
//  * @param width string으로 넣으면 됨 ex) '100%'
//  * @param placeholder placeholder string으로 넣으면 됨
//  * @param disabled 어떨 때 disabled인지
//  * @param icon 버튼 안에 들어갈 이미지
//  * @param iconClick 이미지 클릭 시 실행할 함수
//  * @param label label string으로 넣으면 됨
//  * @param type input을 어떤 스타일로 할 것인지
//  * @param margin 문자열로 넣으면 됨 ex) '10px' ex) '10px 10px'
//  * @param isError 어떨 때 inError인지
//  * @param name useForm쓸 때 필요한 name을 string으로 넣으면 됨
//  * @param value 해당 input의 값
//  * @param onChange useForm이나 useInput의 handleChange 넣으면 됨
//  * @param onKeyDown Input의 handleKeyDown 넣으면 됨
//  * @param onForm 로그인같이 엔터치면 실행할 함수 넣으면 됨
//  * @returns input components
//  */
// export function Input({
//     width = '100%',
//     placeholder,
//     disabled = false,
//     icon,
//     iconClick,
//     label,
//     type = 'text',
//     margin = 0,
//     isError = false,
//     name,
//     value,
//     onChange,
//     onKeyDown,
//     onForm,
// }: inputPropsType) {
//     return (
//         <InputContainer width={width} $margin={margin}>
//             <label>
//                 <Label>{label}</Label>
//                 <InputStyle
//                     type={type}
//                     name={name}
//                     value={value}
//                     onKeyDown={onKeyDown}
//                     onChange={onChange}
//                     width={width}
//                     $isError={isError && !!value}
//                     placeholder={placeholder}
//                     disabled={disabled}
//                     onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
//                         if (e.key === "Enter") {
//                             onForm && onForm();
//                         }
//                     }}
//                 />
//             </label>
//             {isError && !!value && <ErrorMessage>asdf</ErrorMessage>}
//             {icon && <ImageStyle src={icon} alt="" onClick={iconClick} />}
//         </InputContainer>
//     );
// }

// /**
//  * @param disabled 어떨 때 disabled인지
//  * @param text checkBox 옆에 적힐 이름
//  * @param margin 문자열로 넣으면 됨 ex) '10px' ex) '10px 10px'
//  * @param checked checkBox가 클릭된 상태인지
//  * @param onChange 클릭 시 실행할 함수
//  * @returns checkBox components
//  */
// export function CheckBox({ disabled = false, text, margin = 0, checked, onChange }: checkBoxPropsType) {
//     return (
//         <CheckBoxContainer $margin={margin}>
//             <CheckBoxStyle type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
//             <SideText>{text}</SideText>
//         </CheckBoxContainer>
//     );
// }

// /** type이 text거나 number일 때 쓰는 스타일 */
// const InputContainer = styled.div<{
//     width: string;
//     $margin: CSSProperties['margin'];
// }>`
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     width: ${({ width }) => width};
//     gap: 6px;
//     margin: ${({ $margin }) => $margin};
// `;

// const Label = styled.div`
//     font-size: 14px;
//     font-weight: 400;
//     margin: 6px;
//     color: ${color.gray6};
// `;

// const InputStyle = styled.input<{ $isError?: boolean }>`
//     width: 100%;
//     height: 46px;
//     border: ${({ $isError }) => ($isError ? css`1px solid ${color.errorDefault}` : css`1px solid ${color.gray5}`)};
//     border-radius: 4px;
//     font-size: 16px;
//     padding: 0 50px 0 10px;
//     transition: 0.5s;
//     &:focus {
//         border: ${({ $isError }) =>
//             $isError ? css`1px solid ${color.errorDefault}` : css`1px solid ${color.primaryDefault}`};
//     }
// `;

// const ImageStyle = styled(Image)`
//     position: absolute;
//     width: 25px;
//     height: 25px;
//     top: 39px;
//     right: 14px;
// `;

// const ErrorMessage = styled.div`
//     position: absolute;
//     bottom: -18px;
//     left: 16px;
//     font-size: 12px;
//     font-weight: 400;
//     color: ${color.errorDefault};
// `;

// // type이 checkBox일 때 쓰는 스타일
// const CheckBoxContainer = styled.label<{
//     $margin: CSSProperties['margin'];
// }>`
//     width: 125px;
//     height: 30px;
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     margin: ${({ $margin }) => $margin};
// `;

// const CheckBoxStyle = styled.input`
//     appearance: none;
//     width: 24px;
//     height: 24px;
//     margin: 0;
//     border: 2px solid ${color.gray5};
//     border-radius: 2px;
//     &:checked {
//         border-color: transparent;
//         background-image: url('/assets/svg/check.svg');
//         background-size: 80% 80%;
//         background-position: 50%;
//         background-repeat: no-repeat;
//         background-color: ${color.primaryDefault};
//     }
//     &:disabled {
//         border-color: ${color.gray3};
//         background-color: ${color.gray2};
//     }
// `;

// const SideText = styled.div`
//     font-size: 16px;
//     font-weight: 400;
//     color: ${color.gray6};
//     margin: -3px 0 0 14px;
// `;

import React, { InputHTMLAttributes } from "react";
import Image from "next/image";
import styled, { css, CSSProperties } from "styled-components";
import { color } from "@/styles/theme";

interface inputPropsType extends InputHTMLAttributes<HTMLInputElement> {
    width?: string;
    placeholder?: string;
    disabled?: boolean;
    icon?: string;
    iconClick?: () => void;
    label?: string;
    margin?: CSSProperties["margin"];
    isError?: boolean;
    name?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onForm?: () => void;
}

interface checkBoxPropsType {
    disabled?: boolean;
    text?: string;
    margin?: CSSProperties["margin"];
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @param width string으로 넣으면 됨 ex) '100%'
 * @param placeholder placeholder string으로 넣으면 됨
 * @param disabled 어떨 때 disabled인지
 * @param icon 버튼 안에 들어갈 이미지
 * @param iconClick 이미지 클릭 시 실행할 함수
 * @param label label string으로 넣으면 됨
 * @param type input을 어떤 스타일로 할 것인지
 * @param margin 문자열로 넣으면 됨 ex) '10px' ex) '10px 10px'
 * @param isError 어떨 때 inError인지
 * @param name useForm쓸 때 필요한 name을 string으로 넣으면 됨
 * @param value 해당 input의 값
 * @param onChange useForm이나 useInput의 handleChange 넣으면 됨
 * @param onForm 로그인같이 엔터치면 실행할 함수 넣으면 됨
 * @returns input components
 */
export function Input({
    width = "100%",
    placeholder,
    disabled = false,
    icon,
    iconClick,
    label,
    type = "text",
    margin = 0,
    isError = false,
    name,
    value,
    onChange,
    onKeyDown,
    onForm,
}: inputPropsType) {
    return (
        <InputContainer width={width} $margin={margin}>
            <label>
                <Label>{label}</Label>
                <InputStyle
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    width={width}
                    $isError={isError && !!value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") {
                            onForm && onForm();
                        }
                    }}
                />
            </label>
            {isError && !!value && <ErrorMessage>asdf</ErrorMessage>}
            {icon && <ImageStyle src={icon} alt="" onClick={iconClick} />}
        </InputContainer>
    );
}

/**
 * @param disabled 어떨 때 disabled인지
 * @param text checkBox 옆에 적힐 이름
 * @param margin 문자열로 넣으면 됨 ex) '10px' ex) '10px 10px'
 * @param checked checkBox가 클릭된 상태인지
 * @param onChange 클릭 시 실행할 함수
 * @returns checkBox components
 */
export function CheckBox({ disabled = false, text, margin = 0, checked, onChange }: checkBoxPropsType) {
    return (
        <CheckBoxContainer $margin={margin}>
            <CheckBoxStyle type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
            <SideText>{text}</SideText>
        </CheckBoxContainer>
    );
}

/** type이 text거나 number일 때 쓰는 스타일 */
const InputContainer = styled.div<{
    width: string;
    $margin: CSSProperties['margin'];
}>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${({ width }) => width};
    gap: 6px;
    margin: ${({ $margin }) => $margin};
`;

const Label = styled.div`
    font-size: 14px;
    font-weight: 400;
    margin: 6px;
    color: ${color.gray6};
`;

const InputStyle = styled.input<{ $isError?: boolean }>`
    width: 100%;
    height: 46px;
    border: ${({ $isError }) => ($isError ? css`1px solid ${color.errorDefault}` : css`1px solid ${color.gray5}`)};
    border-radius: 4px;
    font-size: 16px;
    padding: 0 50px 0 10px;
    transition: 0.5s;
    &:focus {
        border: ${({ $isError }) =>
            $isError ? css`1px solid ${color.errorDefault}` : css`1px solid ${color.primaryDefault}`};
    }
`;

const ImageStyle = styled(Image)`
    position: absolute;
    width: 25px;
    height: 25px;
    top: 39px;
    right: 14px;
`;

const ErrorMessage = styled.div`
    position: absolute;
    bottom: -18px;
    left: 16px;
    font-size: 12px;
    font-weight: 400;
    color: ${color.errorDefault};
`;

// type이 checkBox일 때 쓰는 스타일
const CheckBoxContainer = styled.label<{
    $margin: CSSProperties['margin'];
}>`
    width: 125px;
    height: 30px;
    display: flex;
    align-items: center;
    gap: 5px;
    margin: ${({ $margin }) => $margin};
`;

const CheckBoxStyle = styled.input`
    appearance: none;
    width: 24px;
    height: 24px;
    margin: 0;
    border: 2px solid ${color.gray5};
    border-radius: 2px;
    &:checked {
        border-color: transparent;
        background-image: url('/assets/svg/check.svg');
        background-size: 80% 80%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: ${color.primaryDefault};
    }
    &:disabled {
        border-color: ${color.gray3};
        background-color: ${color.gray2};
    }
`;

const SideText = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${color.gray6};
    margin: -3px 0 0 14px;
`;