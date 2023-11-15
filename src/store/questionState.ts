import { ChangeEvent } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface categoryState {
    category: string;
    selectCategory: (categoryName: string) => void;
}
/** 선택한 카테코리 state */
export const useCategoryState = create<categoryState>()(
    devtools((set) => ({
        category: "랭킹",
        selectCategory: (categoryName: string) =>
            set({ category: categoryName }),
    }))
);

interface tagState {
    tag: string[];
    selectTag: (tagName: string) => void;
    resetTag: () => void;
}

/** 선택한 태그 state */
export const useTagState = create<tagState>()(
    devtools((set) => ({
        tag: [],
        selectTag: (tagName: string) =>
            set((prev) =>
                prev.tag.includes(tagName)
                    ? { tag: prev.tag.filter((element) => element !== tagName) }
                    : { tag: [...prev.tag, tagName] }
            ),
        resetTag: () => set({ tag: [] }),
    }))
);

interface filterState {
    filter: {
        sortType: boolean;
        questionType: "질문" | "질문세트";
        keyword: string;
    };
    setForm: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    setType: (name: string, type: string | boolean) => void;
}

/** 질문/질문세트 검색 state */
export const useFilter = create<filterState>()(
    devtools((set) => ({
        filter: {
            sortType: true,
            questionType: "질문",
            keyword: "",
        },
        setForm: (e) =>
            set((prev) => ({
                ...prev,
                filter: { ...prev.filter, keyword: e.target.value },
            })),
        setType: (name, type) =>
            set((prev) => ({
                ...prev,
                filter: { ...prev.filter, [name]: type },
            })),
    }))
);

export type sideBarType =
    | "myInfo"
    | "myInfoChange"
    | "answerHistory"
    | "myQuestion"
    | "mySet"
    | "myFavoriteQuestion"
    | "myFavoriteSet";

interface myInfoSideBarState {
    sideBarType:
        | "myInfo"
        | "myInfoChange"
        | "answerHistory"
        | "myQuestion"
        | "mySet"
        | "myFavoriteQuestion"
        | "myFavoriteSet"
        | string;
    setSideBarType: (type: string) => void;
}

/** 마이페이지 sideBar state */
export const useMyInfoSideBar = create<myInfoSideBarState>()(
    devtools((set) => ({
        sideBarType: "myInfo",
        setSideBarType: (type) => set({ sideBarType: type }),
    }))
);
