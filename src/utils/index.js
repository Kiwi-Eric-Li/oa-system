
export default function findLabelById(tree, targetId) {
  if (!tree) return null;

  if (tree.id === targetId) {
    return tree.label;
  }

  if (tree.children && tree.children.length) {
    for (const child of tree.children) {
      const result = findLabelById(child, targetId);
      if (result !== null) return result;
    }
  }

  return null;
}

function formatDate(data){

}

export {formatDate}