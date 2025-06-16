export const findNodesWithNonEmpty = (arr: any[]) => {
  const result: any[] = []

  const traverse = (node: any) => {
    if (Array.isArray(node.children) && node.children.length > 0) {
      result.push(node.id)
      node.children.forEach((child: any) => traverse(child))
    }
  }

  arr.forEach((item) => traverse(item))

  return result
}
