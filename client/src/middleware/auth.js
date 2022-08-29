import { PAGE_ROUTER_LOGIN } from "~/configs/page-router"

export default function (context) {
    context.app.$storage.removeUniversal('token');
    context.app.$storage.removeUniversal('user-info');
}
