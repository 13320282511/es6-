/**
 * Created by zj on 2017/12/11.
 */
import {LIFECYCLE_HOOKS} from '../shared/constants'
export default {
    optionMergeStrategies: Object.create(null),
    _lifecycleHooks: LIFECYCLE_HOOKS,
    /**
     * Whether to record perf
     */
    performance: false,
    /**
     * Custom user key aliases for v-on
     */
    keyCodes: Object.create(null),
    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],
    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: () => false
}