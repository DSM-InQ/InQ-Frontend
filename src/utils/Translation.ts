import developImg from "public/assets/svg/developImg.svg";
import marketingImg from "public/assets/svg/marketingImg.svg";
import planningImg from "public/assets/svg/planningImg.svg";
import commonSenseImg from "public/assets/svg/commonSenseImg.svg";
import learningImg from "public/assets/svg/learningImg.svg";
import careerImg from "public/assets/svg/careerImg.svg";
import personalityImg from "public/assets/svg/personalityImg.svg";

/** 카테고리 type */
export const categoryType: { [key: string]: string } = {
    개발: "DEVELOPMENT",
    마케팅: "MARKETING",
    기획: "PLANNING",
    상식: "COMMON_SENSE",
    학습: "LEARNING",
    경력: "CAREER",
    인성: "PERSONALITY",
};

/** 카테고리별 사진 */
export const categoryImg: { [key: string]: string } = {
    DEVELOPMENT: developImg,
    MARKETING: marketingImg,
    PLANNING: planningImg,
    COMMON_SENSE: commonSenseImg,
    LEARNING: learningImg,
    CAREER: careerImg,
    PERSONALITY: personalityImg,
};
