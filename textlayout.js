export default class textlayout {
    /**
     * 近似计算轻量智能穿戴设备中，text组件中显示的文本在特定样式下的布局高度。
     * 特定样式为 style = "width : 322px; text-align : left; font-size : 30px; letter-spacing : 2px;"
     * @param str text组件中要显示的文本
     */
    static getTextHeight(str) {
        return 40 * this.getTextLayout(str)
    }

    /**
     * 近似计算轻量智能穿戴设备中，text组件中显示的文本在特定样式下的布局行数
     * 特定样式为 style = "width : 322px; text-align : left; font-size : 30px; letter-spacing : 2px;"
     * @param str text组件中要排版的文本
     * @param widthPx=322 排版每行的宽度
     */
    static getTextLayout(str, widthPx=322) {
        let rowNum = 1;
        let rowPx = 0;
        let charPx = 0;
        let i = 0;
        for (; i < str.length; i++) {
            charPx = this.getCharPx(str.charCodeAt(i));
            //单独判断如果是换行，则直接充满这一行
            if (str.charCodeAt(i) == 10) {
                rowPx = 0;
                rowNum += 1;
                continue;
            }
            //如果是期望行数排版模式，则最后一行计算自定义宽度偏移
            //添加字符宽度到这一行中
            if (rowPx + charPx <= widthPx) {
                rowPx += charPx;
            } else {
                rowPx = charPx;
                rowNum += 1;
            }
        }
        return rowNum //str文本在特定样式下的行数
    }

    /**
    * 近似计算轻量智能穿戴设备中，text组件在特定样式下，满足指定行数布局的str和剩余溢出leftStr。
    * 此函数从字符串头部开始计算布局。
    * 特定样式为 style = "width : 322px; text-align : left; font-size : 30px; letter-spacing : 2px;"
    * @param str text组件中要排版的文本
    * @param widthPx=322 排版每行的宽度
    * @param expectRow=7 期望的行数
    * @param offset=0 最后一行的字符偏移量，-1表示少1个字符，+1表示多1个字符，调节排版不准确的问题
    * @param rowWidthPxOffset=-64 最后一行的行宽偏移量，-1表示少1个px，+1表示多1个px，调节排版不准确的问题
    */
    static getTextByLayout(str, widthPx=322, expectRow=7, offset=0, rowWidthPxOffset=0) {
        let rowNum = 1;
        let rowPx = 0;
        let charPx = 0;
        let rowWidthPx = 0;
        let i = 0;
        for (; i < str.length; i++) {
            if (expectRow && rowNum >= expectRow + 1) {
                break;
            }
            charPx = this.getCharPx(str.charCodeAt(i));
            //单独判断如果是换行，则直接充满这一行
            if (str.charCodeAt(i) == 10) {
                rowPx = 0;
                rowNum += 1;
                continue;
            }
            //如果是期望行数排版模式，则最后一行计算自定义宽度偏移
            rowWidthPx = rowNum == expectRow ? widthPx + rowWidthPxOffset : widthPx;
            //添加字符宽度到这一行中
            if (rowPx + charPx <= rowWidthPx) {
                rowPx += charPx;
            } else {
                rowPx = charPx;
                rowNum += 1;
            }
        }
        //如果是限制行数，则返回满足行数要的str和剩余溢出的leftStr
        return {
            str: str.substring(0, i + offset), //可以近似满足行数要求的str文本
            leftStr: str.substring(i + offset), //在满足布局的行数要求后溢出的文本
        }
    }

    /**
    * 近似计算轻量智能穿戴设备中，text组件在特定样式下，满足指定行数布局的str和剩余溢出leftStr。
    * 此函数从字符串尾部开始计算布局。
    * 特定样式为 style = "width : 322px; text-align : left; font-size : 30px; letter-spacing : 2px;"
    * @param str text组件中要排版的文本
    * @param widthPx=322 排版每行的宽度
    * @param expectRow=7 期望的行数
    * @param offset=0 最后一行的字符偏移量，-1表示少1个字符，+1表示多1个字符，调节排版不准确的问题
    * @param rowWidthPxOffset=-64 最后一行的行宽偏移量，-1表示少1个px，+1表示多1个px，调节排版不准确的问题
    */
    static getTextByLayoutReverse(str, widthPx=322, expectRow=7, offset=0, rowWidthPxOffset=0) {
        let rowNum = 1;
        let rowPx = 0;
        let charPx = 0;
        let rowWidthPx = 0;
        let i = str.length - 1;
        for (; i >= 0; i--) {
            if (expectRow && rowNum >= expectRow + 1) {
                break;
            }
            charPx = this.getCharPx(str.charCodeAt(i));
            //单独判断如果是换行，则直接充满这一行
            if (str.charCodeAt(i) == 10) {
                rowPx = 0;
                rowNum++;
                continue;
            }
            //如果是期望行数排版模式，则最后一行计算自定义宽度偏移
            rowWidthPx = rowNum == expectRow ? widthPx + rowWidthPxOffset : widthPx;
            //添加字符宽度到这一行中
            if (rowPx + charPx <= rowWidthPx) {
                rowPx += charPx;
            } else {
                rowPx = charPx;
                rowNum++;
            }
        }
        //限制行数，返回满足充满行数的str和剩余溢出的leftStr
        return {
            str: str.substring(i + offset + 1), //可以近似满足行数要求的str文本
            leftStr: str.substring(0, i + offset + 1), //在满足布局的行数要求后, 首部溢出的文本
        }
    }

    /**
     * 近似计算每个字符在特定样式下的宽度。
     * 特定样式为 style = "width : 322px; text-align : left; font-size : 30px; letter-spacing : 2px;"
     * @param charCode 字符的charCode
     */
    static getCharPx(charCode) {
        let charPx = 0;
        //判断这个字符的宽度
        if (charCode > 128) { //中字符
            charPx = 32;
        } else if (charCode >= 48 && charCode <= 57) { //数字
            charPx = 22;
        } else if (charCode >= 97 && charCode <= 122) { //小写字母
            if (charCode == 116 || charCode == 105 || charCode == 106 || charCode == 108) { //比较窄的几个字符tjil
                charPx = 9.875;
            } else if (charCode == 109) { //m比较宽
                charPx = 31
            } else if (charCode == 119) { //w比较宽
                charPx = 28
            } else {
                charPx = 20.3;
            }
        } else if (charCode >= 65 && charCode <= 90) { //大写字母
            if (charCode == 73) { //I比较窄，单独判断
                charPx = 10;
            } else if (charCode == 87) { //W比较宽
                charPx = 35;
            } else if (charCode == 77) { //M比较宽
                charPx = 31;
            } else { //其他字母平均23.5
                charPx = 23.5;
            }
        } else if (charCode >= 0 && charCode <= 128) { //其他英文字符
            if (charCode == 32) { //空格比较窄
                charPx = 9;
            } else {
                charPx = 21
            }
        }
        return charPx;
    }
}