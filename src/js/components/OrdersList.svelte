<script>
    import { getUserOrders } from "../externalServices.mjs";
    import { formatDate } from "../utils.mjs";

    async function getOrders() {
         orders = await getUserOrders(token);
    }

    let orders;
    export let token;
    getOrders();
</script>

<style>
    div.grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        grid-gap: 1em;
        padding: 1em;
    }
    .card {
        background-color: #e1e9f1;
        padding: 1em;
        padding-bottom: .5em;
        padding-left: 1em;
        padding-right: 1em;
        box-shadow: 0px 2px 2px 0px #00000031;
        border-radius: 10px;
        font-size: 1rem;
    }
    .card h5, p {
        margin: 0;
        margin-bottom: .5em;
    }
    .card-body {
        display: flex;
        justify-content: space-between;
    }
</style>

<h2>Orders</h2>
<div class="grid">
    {#if orders}
        {#each orders as order}
            <div class="card">
                <div class="card-body">
                    <div>
                        <h5 class="card-subtitle mb-2 text-muted">Order Date: {formatDate(order.orderDate)}</h5>
                        <p>Customer: {order.fname} {order.lname}</p>
                    </div>
                    <div>
                        <p class="card-text">Items: {order.items.length}</p>
                        <p class="card-text">State: {order.state}</p>
                    </div>
                    <div>
                        <p class="card-text" style="display: inline-block">Tax: ${order.tax}</p>
                        <p class="card-text" style="display: inline-block">Shipping: ${order.shipping}</p>
                        <p class="card-text">Order Total: ${order.orderTotal}</p>
                    </div>
                </div>
            </div>
        {/each}
    {/if}
</div>