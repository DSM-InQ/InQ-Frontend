import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CategoryState {
    category: string;
    selectCategory: (categoryName: string) => void;
}
/** 선택한 카테코리 state */
export const useCategoryState = create<CategoryState>()(
    devtools((set) => ({
        category: "랭킹",
        selectCategory: (categoryName: string) =>
            set({ category: categoryName }),
    }))
);

interface TagState {
    tag: string[];
    selectTag: (tagName: string) => void;
    resetTag: () => void;
}

/** 선택한 태그 state */
export const useTagState = create<TagState>()(
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
