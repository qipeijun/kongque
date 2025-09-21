import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";


// 自定义指令
export function loadDirectives(app) {

    // v-scrollBar
    /**
     * @description 滚动条
     * @param {Array} type ['x','y']  x 横向滚动条  y 纵向滚动条
     */
    app.directive('scrollBar', {
        mounted(el, binding) {
            let type = binding.value || ['y']
            const rules = ["fixed", "absolute", "relative"];
            if (!rules.includes(window.getComputedStyle(el, null).position)) {
                el.style.position = 'relative'
            }
            el._ps_ = new PerfectScrollbar(el, {
                suppressScrollX: !type.includes('x'),
                suppressScrollY: !type.includes('y')
            });
        },
        updated(el, binding) {
            const type = binding.value || []
            if (el._ps_ instanceof PerfectScrollbar) {
                el._ps_.update();
            }
        },
    })
}

