import 'nprogress/nprogress.css'

import NProgress from 'nprogress'

NProgress.configure({
  template: `
    <div
      class="bar"
      role="bar"
      style="height: 3px; background: rgb(56, 151, 240);">
    </div>
  `,
})

export default NProgress
