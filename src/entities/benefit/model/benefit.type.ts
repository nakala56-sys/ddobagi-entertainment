export type Benefit = {
    id: string;
    title: string;
    description: string;
    image: string;
};

export type BenefitGroup = {
    title: string;
    englishTitle: string;
    description: string;
    benefitIds: string[];
};
