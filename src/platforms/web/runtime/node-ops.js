/**
 * Created by zj on 2017/12/15.
 */
export function createElement (tagName, vnode){
    const elm = document.createElement(tagName)
    if (tagName !== 'select') {
        return elm
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
        elm.setAttribute('multiple', 'multiple')
    }
    return elm
}
export function tagName (node){
    return node.tagName
}
export function parentNode (node){
    return node.parentNode
}
export function nextSibling (node){
    return node.nextSibling
}
export function createTextNode (text) {
    return document.createTextNode(text)
}
export function insertBefore (parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode)
}