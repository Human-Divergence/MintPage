export const shortenAddress = (address: string | undefined) => {
    if (address) {
        return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
    }
}
