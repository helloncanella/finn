function getBoundingClientRect(nodes) {
    if (nodes && !Array.isArray(nodes))
        nodes = [nodes]

    return nodes.map(node => {
        if (typeof node === 'string') node = document.querySelector(node)
        return node ? node.getBoundingClientRect() : {}
    })

}

export function clientRect(node, reference) {

    [node, reference] = getBoundingClientRect([node, reference])

    const width = node.width
        , height = node.height

    const top = node.top - (reference.top || 0)
        , left = node.left - (reference.left || 0)

    const bottom = top + height
        , right = left + width


    return { width, height, top, left, bottom, right }
}



