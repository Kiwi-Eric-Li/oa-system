
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

/**
 * 根据身份证号计算年龄
 * 支持 15 位 & 18 位中国身份证
 * @param {string} idCard
 * @returns {number|null} 年龄（非法身份证返回 null）
 */
function getAgeByIdCard(idCard) {
    if (!idCard || typeof idCard !== 'string') return null

    let birthStr = ''

    // 18 位身份证
    if (/^\d{17}[\dXx]$/.test(idCard)) {
        birthStr = idCard.substring(6, 14) // YYYYMMDD
    }
    // 15 位身份证
    else if (/^\d{15}$/.test(idCard)) {
        birthStr = '19' + idCard.substring(6, 12) // YYMMDD → 19YYMMDD
    } else {
        return null
    }

    const year = parseInt(birthStr.substring(0, 4))
    const month = parseInt(birthStr.substring(4, 6))
    const day = parseInt(birthStr.substring(6, 8))

    const now = new Date()
    let age = now.getFullYear() - year

    // 判断生日是否已过
    const currentMonth = now.getMonth() + 1
    const currentDay = now.getDate()

    if (
        currentMonth < month ||
        (currentMonth === month && currentDay < day)
    ) {
        age--
    }

    return age >= 0 ? age : null
}

function formatDate(data){
  if(data === null || data === ""){
    return "";
  }
  return data.split('T')[0];
}

export {getAgeByIdCard, formatDate}