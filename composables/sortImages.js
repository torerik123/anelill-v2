export const useSortImages = (images) => {
    const sortedImages = []
    Object.values(images).forEach((item) => {
        const image = {
            id: item.id,
            order: item.order,
            title: item.title,
            src: item.image.responsiveImage.src,
            size: item.size,
            sold: item.sold,
            description: item.description,
        }
        sortedImages.push(image)
    })

    sortedImages.sort((a, b) => {
        return a.order - b.order
    })

    return sortedImages     
}
            