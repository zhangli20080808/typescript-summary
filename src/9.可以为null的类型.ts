// null 和 undefined 既可以作为类型 也可以作为值
// let s = 'foo'
// s= null
//
// let sn :string | null = 'bus'
// sn = null
//
// sn = undefined

function fn(x: number, y?: number) {
    return x + (y || 0)
}

fn(1, 2)
fn(1)
fn(1, undefined)

// fn(1,null)  // 报错

function breakIng(name: string | null): string {
    function postFix(ept: string) {
        // ! 明确告诉编辑器 name不为null
        return name!.charAt(0) + '. the ' + ept
    }

    name = name || 'bob'
    return postFix(name)
}
// 字符串字面量类型

export {}