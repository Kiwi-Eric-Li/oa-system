
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

/**
 * 根据身份证号获取出生日期
 */
function getBirthdayFromIdCard(idCard) {
  if (!idCard) return null;

  idCard = idCard.trim();

  let year, month, day;

  // 18位身份证
  if (/^\d{17}[\dXx]$/.test(idCard)) {
    year = idCard.substring(6, 10);
    month = idCard.substring(10, 12);
    day = idCard.substring(12, 14);
  }
  // 15位身份证
  else if (/^\d{15}$/.test(idCard)) {
    year = '19' + idCard.substring(6, 8);
    month = idCard.substring(8, 10);
    day = idCard.substring(10, 12);
  } else {
    return null;
  }

  // 简单校验日期合法性
  const birthday = `${year}-${month}-${day}`;
  const date = new Date(birthday);

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() + 1 !== Number(month) ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }

  return birthday;
}



function formatDate(data){
  if(data === null || data === ""){
    return "";
  }
  return data.split('T')[0];
}

function genderMap(val){
  const genderObj = {"1": '男', "0": '女'};
  return genderObj[val];
}

function marriageMap(val){
  const marriageObj = {"1": '已婚', "2": '未婚'};
  return marriageObj[val];
}

function educationMap(val){
  const educationObj = {"1": "专科", "2": "本科", "3": "硕士", "4": "博士", "5": "博士后"};
  return educationObj[val];
}


export {getAgeByIdCard, formatDate, genderMap, marriageMap, educationMap, getBirthdayFromIdCard}