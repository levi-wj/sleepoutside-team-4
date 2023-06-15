<script>
    import { getUserOrders } from "../externalServices.mjs";
    import { getLocalStorage } from "../utils.mjs";

    async function getOrders() {
        orders = await getUserOrders(token);
        console.log(orders);
    }

    let orders;
    export let token;
    getOrders();
</script>

