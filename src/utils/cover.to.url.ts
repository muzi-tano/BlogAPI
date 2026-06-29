export const coverToUrl = (coverName: string): string => {
    return coverName? `${process.env.BASE_URL}/images/covers/${coverName}`: '';
};