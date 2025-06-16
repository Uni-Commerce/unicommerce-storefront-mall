export const buildTree = (data: any[], childKey = 'children') => {
  if (!Array.isArray(data)) {
    return []
  }

  return data.map((item) => {
    const node: any = {
      value: item.id || item.code || '', // 可以根据实际情况调整value的来源
      label: item.name || item.label || '', // 可以根据实际情况调整label的来源
      children: []
    }

    // 如果存在子节点数据，则递归处理
    if (item[childKey] && Array.isArray(item[childKey])) {
      node.children = buildTree(item[childKey], childKey)
    }

    return node
  })
}
