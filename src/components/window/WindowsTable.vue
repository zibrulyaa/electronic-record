<script setup lang='ts'>

</script>

<template>
    <!-- <div class="windows__table">
        <div class="table-header">
            <div class="table__cell-heading">
                <div
                    class="cell"
                    v-for="(cell, index) in 9"
                    :key="index"
                >
                    {{ index }} окно
                </div>
            </div>
        </div> 
    </div>-->

    <table class="table">
        <thead class="table__header">
            <tr class="table__cell-heading">
                <th
                    class="cell"
                    v-for="(cell, index) in 9"
                    :key="index"
                >
                    {{ index }} окно
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="table__current-client">
                <td
                    class="cell"
                    v-for="(cell, index) in 9"
                    :key="index"
                >
                    А001
                </td>
            </tr>
            <tr class="table__row">
                <td
                    class="cell"
                    v-for="(cell, index) in 9"
                    :key="index"
                >А002</td>
            </tr>
            <tr class="table__row">
                <td
                    class="cell"
                    v-for="(cell, index) in 9"
                    :key="index"
                >А003</td>
            </tr>
            <tr class="table__row">
                <td
                    class="cell"
                    v-for="(cell, index) in 9"
                    :key="index"
                >А004</td>
            </tr>
            <tr class="table__row">
                <td
                    class="cell"
                    v-for="(cell, index) in 9"
                    :key="index"
                >А005</td>
            </tr>
            <tr class="table__row">
                <td
                    class="cell"
                    v-for="(cell, index) in 9"
                    :key="index"
                >А006</td>
            </tr>
            <tr class="table__row">
                <td
                    class="cell"
                    v-for="(cell, index) in 9"
                    :key="index"
                >А007</td>
            </tr>
            <tr class="table__row">
                <td
                    class="cell"
                    v-for="(cell, index) in 9"
                    :key="index"
                >А008</td>
            </tr>
        </tbody>
    </table>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


// table td {
//     padding: 20px 29px;
//     max-width: 132px;
//     width: 100%;
// }

.cell{
    padding: 20px 29px;
    max-width: 132px;
    width: 100%;
}

.table {
    border-collapse: collapse;
    max-width: $container-width;
    width: 100%;
    text-align: center;
    table-layout: fixed;

    &__header {
        background-color: $white;
        border: 2px solid $accent;
        border-radius: 5px;
    }

    &__current-client {
        font-size: 20px;
        font-weight: 700;
        line-height: 140%;
        color: $accent;
        background-color: $white;
    }

    // .table__cell-heading

    &__cell-heading {
        font-size: 20px;
        font-weight: 500;
        line-height: 140%;
        text-align: center;
        background-color: $white;
    }

    // .table__row

    &__row {
        background-color: $white;

        &:nth-child(even) {
            background-color: rgba(36, 108, 226, 0.25);
        }
    }
}
</style>