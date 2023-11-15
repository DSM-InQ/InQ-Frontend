import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled, { CSSProperties } from "styled-components";
import chevron from "public/assets/svg/chevron.svg";
import { color } from "@/styles/theme";

interface DropDownProps<T> {
    value?: T;
    margin?: CSSProperties["margin"];
    border?: CSSProperties["border"];
    width?: string;
    onChange: (value: T) => void;
    option: T[];
}

/**
 * @param margin 문자열로 넣으면 됨 ex) '10px' ex) '10px 10px'
 * @param border 문자열로 넣으면 됨 ex) `1px solid ${color.gray4}`
 * @param option 선택지 배열로 넣으면 됨
 * @param value input에 value 넣듯이 넣으면 됨
 * @param onChange 선택지 클릭시 해당 선택지를 string으로 return 해줌
 * @param width string으로 넣으면 됨 ex) '100%'
 * @returns 드롭다운 components
 */
export const DropDown = <T extends string>({
    margin = 0,
    border = `1px solid ${color.gray4}`,
    option,
    value,
    onChange,
    width = "100%",
}: DropDownProps<T>) => {
    /** 드롭다운을 열고 닫기 위한 state */
    const [isopen, setIsopen] = useState<boolean>(false);
    /** 드롭다운의 값을 관리하기 위한 state */
    const [data, setData] = useState<T>(value ? value : option[0]);
    /** 바탕을 누르면 드롭다운을 닫기 위한 ref */
    const outsideRef = useRef<HTMLDivElement>(null);

    /** 기본값 변경을 위한 useEffect */
    useEffect(() => {
        setData(value ? value : option[0]);
    }, [value, option]);

    /** 바탕을 누르면 꺼지는 기능을 구현하기 위한 useEffect */
    useEffect(() => {
        function handleClickOutside(event: any) {
            // 현재 document에서 mousedown 이벤트가 동작하면 호출되는 함수입니다.
            if (
                outsideRef.current &&
                !outsideRef.current.contains(event.target)
            ) {
                setIsopen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [outsideRef]);

    return (
        <_DropdownWrapper width={width} ref={outsideRef}>
            <_Selector
                onClick={() => {
                    setIsopen(!isopen);
                }}
                $margin={margin}
                width={width}
                border={border}
            >
                {data}
                <_Img $isopen={isopen}>
                    <Image src={chevron} alt="" />
                </_Img>
            </_Selector>
            {isopen && option && option.length > 0 && (
                <_Items width={width} $isopen={isopen}>
                    {option
                        ?.filter((res) => data !== res)
                        .map((res, idx) => {
                            return option.length - 2 === idx ? (
                                <_Item
                                    key={idx}
                                    width={width}
                                    onClick={() => {
                                        setData(res);
                                        setIsopen(false);
                                        onChange(res);
                                    }}
                                >
                                    {res}
                                </_Item>
                            ) : (
                                <>
                                    <_Item
                                        key={idx}
                                        width={width}
                                        onClick={() => {
                                            setData(res);
                                            setIsopen(false);
                                            onChange(res);
                                        }}
                                    >
                                        {res}
                                    </_Item>
                                    <Devider />
                                </>
                            );
                        })}
                </_Items>
            )}
        </_DropdownWrapper>
    );
};

const _DropdownWrapper = styled.div<{ width?: string }>`
    position: relative;
    width: ${({ width }) => width};
    display: flex;
    flex-direction: column;
`;

const _Selector = styled.div<{
    $margin: CSSProperties["margin"];
    width: string;
    border: CSSProperties["border"];
}>`
    position: relative;
    border-radius: 4px;
    border: ${({ border }) => border};
    background: ${color.gray1};
    padding: 10px 10px 10px 15px;
    height: 46px;
    width: 100%;
    display: flex;
    z-index: 99;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    margin: ${({ $margin }) => $margin};
`;

const _Items = styled.div<{ width: string; $isopen?: boolean }>`
    position: absolute;
    width: ${({ width }) => width};
    margin-top: 50px;
    overflow: scroll;
    max-height: 180px;
    z-index: 100;
    background-color: ${color.gray1};
    box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    @keyframes dropdown {
        0% {
            max-height: 0px;
        }
        100% {
            max-height: 160px;
        }
    }
    animation: dropdown 0.5s ease;
`;

const _Item = styled.div<{ width: string }>`
    display: flex;
    align-items: center;
    width: ${({ width }) => width};
    height: 45px;
    padding-left: 15px;
    color: ${color.gray5};
    z-index: 1;
    &:hover {
        color: ${color.gray6};
        cursor: pointer;
    }
`;

const _Img = styled.div<{ $isopen?: boolean }>`
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    rotate: ${({ $isopen }) => ($isopen ? "180deg" : "0deg")};
    transition-duration: 0.5s;
`;

const Devider = styled.div`
    width: 90%;
    height: 0px;
    border: 0.5px solid ${color.gray3};
    margin-left: 5%;
`;
