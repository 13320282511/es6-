/**
 * Created by zj on 2017/12/14.
 */
import {createPatchFunction} from '../../../core/vdom/patch'
import  * as nodeOps from './node-ops'
export const patch = createPatchFunction(nodeOps);