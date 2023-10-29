import { useEffect, useState } from "react";

/** 처음 랜더링 되었을 때는 실행이 안 되었다가 두 번째 부터 실행되는 useEffect입니다. */
export const useDidMountEffect = (func: () => void, deps: Array<any>) => {
    /** 처음 호출인지 구분하는 state */
    const [didMount, setDidMount] = useState(false);

    /** 처음 호출이 아니라면 실행 */
    useEffect(() => {
        if (didMount) func();
        else setDidMount(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};
