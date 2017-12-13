/**
 * Created by zj on 2017/12/13.
 */
/**
 * Query an element selector if it's not an element already.
 */
export function query (el){
    if (typeof el === 'string') {
        const selected = document.querySelector(el)
        if (!selected) {
            process.env.NODE_ENV !== 'production' && warn(
                'Cannot find element: ' + el
            )
            return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}