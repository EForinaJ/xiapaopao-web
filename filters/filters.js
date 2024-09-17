/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-10-07 14:52:32
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-13 17:50:33
 * @FilePath: \web\filters\filters.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { differenceInHours,differenceInDays,differenceInMonths,differenceInMinutes,differenceInYears } from "date-fns"


// 日期修改
export function resetData(date){
    let str = date
   
    date = date.replace(/-/g, '/');
    const startDate = new Date(date);
    const endDate = new Date();

    let inMinutes = differenceInMinutes(endDate, startDate)
    if (inMinutes > 0 && inMinutes < 10) {
        str = `刚刚`
        return str
    }
    
    if (inMinutes >= 10 && inMinutes < 60) {
        str = `${inMinutes}分钟之前`
        return str
    }

    const inHours = differenceInHours(endDate, startDate)
    if (inHours >= 1 && inHours < 24) {
        str = `${inHours}小时之前`
        return str
    }

    const inDays = differenceInDays(endDate, startDate)
    if (inDays >= 1 && inDays < 31) {
        str = `${inDays}天之前`
        return str
    }

    const inMonths = differenceInMonths(endDate, startDate)
    if (inMonths >= 1 && inMonths < 12) {
        str = `${inMonths}月之前`
        return str
    }

    const inYeas = differenceInYears(endDate, startDate)
    if (inYeas >= 1 ) {
        str = `${inYeas}年之前`
        return str
    }
    
    return str;
}

// 日期修改
export function resetNum(count){
    let str = ""
   
    if (count >= 0 && count < 999) {
        str = `${count}`
        return str
    }
    
    if (count >= 999 && count <= 9999) {
        str = `${Math.round(count / 1000)}k`
        return str
    }

    if (count >= 9999 && count <= 99999) {
        str = `${Math.round(count / 10000)}w`
        return str
    }

    if (count > 99999) {
        str = `${10}w+`
        return str
    }
    return str;
}

// 缩略图
export function resetImage(v,base = "",w = null,h = null){
    if (v.includes(base)) {
        if (w == null || h == null) { 
            return v;
        }
        v = v+`@w${w}_h${h}`
        return v;
    }else{
        return v;
    }
}
