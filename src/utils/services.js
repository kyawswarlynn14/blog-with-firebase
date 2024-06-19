
export const getCategoryName = (categories, id) => {
    return categories.find(c => c.id === id)?.title;
}