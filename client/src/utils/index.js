export const formatNumberWithCommas = (num) => {
    return num.toLocaleString('en-US')
}

export const toggleBodyScrollbar = (visible) => {
    if (visible)
        document.documentElement.style.overflow = 'hidden'
    else
        document.documentElement.style.overflow = 'auto'
}
